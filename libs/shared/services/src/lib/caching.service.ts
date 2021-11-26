import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { SafeAny } from '@school-v2/shared/utils';

@Injectable({providedIn: 'root'})
export class CachingService {
    cacheMap = new Map<SafeAny, SafeAny>(null);

    /**
     * Gets from cache
     * @param req
     * @returns from cache
     */
    getFromCache(req: HttpRequest<SafeAny>): HttpResponse<SafeAny> | undefined {
        const url = req.urlWithParams;
        const cached = this.cacheMap.get(url);

        if (!cached) {
            return undefined;
        }

        return this.cacheMap.get(url).response;
    }

    /**
     * Adds to cache
     * @param req
     * @param response
     */
    addToCache(req: HttpRequest<SafeAny>, response: HttpResponse<SafeAny>): void {
        const url = req.url;
        const entry = {url, response, addedTime: Date.now()};
        this.cacheMap.set(url, entry);
    }
}
