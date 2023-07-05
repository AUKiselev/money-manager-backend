export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IDeleteTokenData {
  acknowledged: boolean;
  deletedCount: number;
}
