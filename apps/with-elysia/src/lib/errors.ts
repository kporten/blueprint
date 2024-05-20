export class UnauthorizedError extends Error {
  code = 'UNAUTHORIZED';
  status = 401;

  constructor(message?: string) {
    super(message ?? 'UNAUTHORIZED');
  }
}
