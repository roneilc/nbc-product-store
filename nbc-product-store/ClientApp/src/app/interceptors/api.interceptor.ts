import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../environment';

interface ApiError {
    status: number | null;
    message: string;
    original?: any;
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    apiDomainUrl: string;

    constructor() {
        this.apiDomainUrl = environment.apiUrl;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiRequest = req.url.startsWith(this.apiDomainUrl) || req.url.startsWith('/api');

        // Only intercept API requests
        if (!isApiRequest) {
            return next.handle(req);
        }

        const mockToken = 'Bearer testToken12345';
        const authReq = req.clone({ setHeaders: { Authorization: mockToken } });

        return next.handle(authReq).pipe(
            catchError((err: any) => {
                const apiErr: ApiError = { status: null, message: '' };

                // HTTP errors
                if (err instanceof HttpErrorResponse) {
                    apiErr.status = err.status ?? null;

                    //400 level errors
                    if (err.status >= 400 && err.status < 500) {
                        apiErr.message = err.error?.message || err.statusText || '400 level error occurred.';
                        apiErr.original = err.error ?? err.message ?? err;
                        console.warn('API Client error:', authReq.url, apiErr);
                        return throwError(() => apiErr);
                    }

                    //500 level errors
                    if (err.status >= 500) {
                        apiErr.message = 'Server error occurred. Please try again later.';
                        apiErr.original = err.error ?? err.message ?? err;
                        console.error('API Server error:', authReq.url, apiErr);
                        return throwError(() => apiErr);
                    }
                }

                // Fallback
                apiErr.message = err?.message || String(err);
                apiErr.original = err;
                console.error('Unknown error:', authReq.url, apiErr);
                return throwError(() => apiErr);
            })
        );
    }
}
