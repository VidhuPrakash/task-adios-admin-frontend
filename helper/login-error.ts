// services/helper/login-error.ts

export class LoginError extends Error {
  constructor(
    message: string,
    public status: number = 400,
    public fieldErrors?: { field: string; message: string }[]
  ) {
    super(message);
    this.name = "LoginError";
  }
}
