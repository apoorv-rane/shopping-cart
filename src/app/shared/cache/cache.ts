import { HttpRequest, HttpResponse } from '@angular/common/http';

export abstract class Cache {
    abstract get(request: HttpRequest<any>): HttpResponse<any> | null
    abstract put(request: HttpRequest<any>, response: HttpResponse<any>): void
} 