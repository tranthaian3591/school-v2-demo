import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SafeAny } from '@school-v2/shared/utils';

@Injectable({
    providedIn: 'root',
})
export class HandlerService {
    /**
     * Handles error
     * @param error
     * @returns
     */
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // no error
        } else {
            return throwError(error.error);
        }
        return throwError('Something bad happened; please try again later.');
    }

    /**
     * Parses error blob
     * @param err
     * @returns error blob
     */
    parseErrorBlob(err: HttpErrorResponse): Observable<SafeAny> {
        const reader: FileReader = new FileReader();

        const obs = Observable.create((observer: SafeAny) => {
            reader.onloadend = (e) => {
                observer.error(JSON.parse(reader.result as SafeAny));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }
}
