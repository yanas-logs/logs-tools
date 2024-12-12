export class ClipboardManager {
    async copy(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        throw new Error('Failed to copy text to clipboard');
      }
    }
  }
  
  