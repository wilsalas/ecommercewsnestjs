export interface IJwtAuthPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
