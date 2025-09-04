import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleHttpError(err: HttpErrorResponse) {
  // Your backend GlobalExceptionHandler returns { status, error, details? }
  if (err.error && typeof err.error === 'object') {
    const message = (err.error.error ?? JSON.stringify(err.error));
    return throwError(() => new Error(message));
  }
  return throwError(() => new Error(err.message || 'Network error'));
}
