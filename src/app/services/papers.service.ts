import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {EnvironmentService} from "./environment.service";

@Injectable({
    providedIn: 'root'
})
export class PapersService {
    private _url: string = null;

    constructor(
        private http: HttpClient,
        private _environmentService: EnvironmentService,
    ) {
        this._url = this._environmentService.getValue('apiUrl');
    }

    public getPapers(
        q = '',
        sort = '',
        order = 'desc',
        page = 0,
        limit = 3
    ): Observable<HttpResponse<any>> {
        return this.http.get(`${this._url}/papers`, {
            params: new HttpParams()
                .set('q', q)
                .set('_sort', sort)
                .set('_order', order)
                .set('_page', page.toString())
                .set('_limit', limit.toString()),
            // to get the number of records:
            observe: 'response'
        }).pipe(
            map((res) => res),
        );
    }
}
