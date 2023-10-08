import natural from 'natural';

export const analyzeText = (text: string) => {
  const tokenizer = new natural.WordTokenizer();
  return tokenizer.tokenize(text);
};
