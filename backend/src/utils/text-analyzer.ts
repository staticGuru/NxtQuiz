export class TextAnalyzer {
  static analyze(text: string) {
    const wordCount = this.countWords(text);
    const charCount = this.countCharacters(text);
    const sentenceCount = this.countSentences(text);
    const paragraphCount = this.countParagraphs(text);

    return {
      words: wordCount,
      characters: charCount,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
    };
  }

  private static countWords(text: string): number {
    const words = text.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }

  private static countCharacters(text: string): number {
    return text.length;
  }

  private static countSentences(text: string): number {
    const sentences = text.match(/[^.!?]+[.!?]/g);
    return sentences ? sentences.length : 0;
  }

  private static countParagraphs(text: string): number {
    const paragraphs = text.split(/\n+/);
    return paragraphs.filter((paragraph) => paragraph.trim().length > 0).length;
  }
}
