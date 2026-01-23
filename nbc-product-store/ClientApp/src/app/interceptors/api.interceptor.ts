import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    apiDomainUrl: string;

    constructor() {
        this.apiDomainUrl = environment.apiUrl;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('APIInterceptor:', req);
        const isApiRequest = req.url.startsWith(this.apiDomainUrl) || req.url.startsWith('/api');

        if (!isApiRequest) {
            return next.handle(req);
        }

        const mockToken = 'Bearer testToken12345';
        const authReq = req.clone({ setHeaders: { Authorization: mockToken } });
        return next.handle(authReq);

    }
}
