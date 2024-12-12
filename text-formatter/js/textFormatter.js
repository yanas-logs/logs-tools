export class TextFormatter {
    format(text, type) {
      switch (type) {
        case 'title':
          return this.toTitleCase(text);
        case 'upper':
          return text.toUpperCase();
        case 'lower':
          return text.toLowerCase();
        case 'sentence':
          return this.toSentenceCase(text);
        default:
          return text;
      }
    }
  
    toTitleCase(text) {
      return text
        .toLowerCase()
        .split(' ')
        .map(word => {
          if (this.isArticle(word)) return word;
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    }
  
    toSentenceCase(text) {
      return text
        .toLowerCase()
        .replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
    }
  
    isArticle(word) {
      const articles = ['a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of'];
      return articles.includes(word.toLowerCase());
    }
  }