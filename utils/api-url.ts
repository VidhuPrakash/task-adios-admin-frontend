/**
 * Given a path, returns a URL that is the API base URL joined with that path.
 * The API base URL is the NEXT_PUBLIC_API_BASE environment variable.
 * The NEXT_PUBLIC_API_BASE should have a trailing slash, but it will be
 * stripped if it does.
 */
export const apiUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "")}/${path}`;
