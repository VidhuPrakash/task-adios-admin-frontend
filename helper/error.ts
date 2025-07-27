// services/helper/error.ts

export class FetchError extends Error {
  constructor(
    message: string,
    public status: number = 400,
    public fieldErrors?: { field: string; message: string }[]
  ) {
    super(message);
    this.name = "api-error";
  }
}
