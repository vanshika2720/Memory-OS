import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const userId = (session.user as any).id;

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    // Full-text search using raw query since tsvector is not directly supported by Prisma's findMany for all versions/setups
    const memories = await prisma.$queryRaw`
      SELECT id, summary, "memoryType", "sourceType", "timestampOriginal", ts_rank(search_vector, plainto_tsquery('english', ${query})) as rank
      FROM "Memory"
      WHERE "userId" = ${userId} AND search_vector @@ plainto_tsquery('english', ${query})
      ORDER BY rank DESC
      LIMIT 20
    `;

    // Group by memoryType
    const grouped = (memories as any[]).reduce((acc, memory) => {
      const type = memory.memoryType;
      if (!acc[type]) acc[type] = [];
      acc[type].push(memory);
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json(grouped);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
