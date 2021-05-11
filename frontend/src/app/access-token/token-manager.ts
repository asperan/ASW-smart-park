let token = "";

export function setToken(newToken: string): void {
  token = newToken;
}

export function getToken(): string {
  return token;
}