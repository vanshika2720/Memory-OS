interface ParsedMessage {
  timestamp: Date;
  sender: string;
  message: string;
}

export function parseWhatsAppExport(fileContent: string): ParsedMessage[] {
  const lines = fileContent.split('\n');
  const messages: ParsedMessage[] = [];
  
  // Format: "DD/MM/YYYY, HH:MM - Name: message"
  const regex = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{2})\s-\s([^:]+):\s(.+)$/;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const [_, dateStr, timeStr, sender, message] = match;
      
      // Basic date parsing (might need adjustment based on specific locale format)
      const [day, month, year] = dateStr.split('/');
      const timestamp = new Date(`${month}/${day}/${year} ${timeStr}`);
      
      if (!isNaN(timestamp.getTime())) {
        messages.push({
          timestamp,
          sender: sender.trim(),
          message: message.trim()
        });
      }
    }
  }

  return messages;
}
