import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SafeAny } from '@school-v2/shared/utils';
import { AppConfigEnv } from '@school-v2/web-config';
import { IFile } from '@school-v2/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  config = AppConfigEnv.settings;
  private apiUrl: string;
  protected http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    // set environment
    this.apiUrl = `${this.config.apiServer}/api`;
  }

  /**
   * Gets http client service
   * @param api
   * @param [params]
   * @returns get
   */
  get<T>(api: string, params?: any): Observable<T> {
    let url = '';
    let queryString = '';
    if(params) {
      queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
      url = this.apiUrl + api + '?' + queryString

    } else {
      url = this.apiUrl + api
    }

    return this.http.get<T>(url);
  }

  /**
   * Puts http client service
   * @param api
   * @param data
   * @returns put
   */
  put<T>(api: string, data: any): Observable<T> {
    const url = this.apiUrl + api;
    return this.http.put<T>(url, data);
  }

  /**
   * Posts http client service
   * @param api
   * @param data
   * @param isRead
   * @returns post
   */
  post<T>(
    api: string,
    data: any,
    isRead?: boolean,
    version?: number
  ): Observable<SafeAny> {
    let url = version
      ? `${this.config.apiServer}/api/v${version}/`
      : this.apiUrl;
    url = url + api;
    const header = new HttpHeaders({ Read: isRead ? 'true' : 'false' });
    return this.http.post<T>(url, data, {
      headers: header,
    });
  }

  /**
   * API delete for single && multiple record
   * @param api
   * @param [body]
   * @returns delete
   */
  delete<T>(api: string, id: number): Observable<SafeAny> {
    const url = `${this.apiUrl}${api}?ID=${id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<T>(url, options);
  }

  /**
   * Reads api service
   * @param api
   * @param data
   * @param isCache
   * @returns read
   */
  read<T>(api: string, data: any, isCache?: boolean): Observable<SafeAny> {
    const url = this.apiUrl + api;
    let header = new HttpHeaders();
    header = header.append('Read', 'true');
    if (isCache) {
      header = header.set('cache-response', 'true');
    }
    return this.http.post<T>(url, data, {
      headers: header,
    });
  }

  /**
   * Upload file
   * @param api
   * @param data
   * @returns post
   */
  upload(api: string, data: SafeAny): Observable<IFile[]> {
    return this.http.post<IFile[]>(this.apiUrl + api, data);
  }
}
