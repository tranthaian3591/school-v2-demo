export interface LoginModel {
  Data: {
    Token: string;
    Expires: number;
    RefreshTokenExpiryMinutes: number;
    RefreshToken: string;
    SessionCode: string;
  };
}
