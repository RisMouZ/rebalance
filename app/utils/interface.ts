export interface Token {
  identifier: string;
  ticker: string;
  balance: string;
  decimals: number;
  price?: number;
}

export interface TokensProps {
  tokens: Token[];
}