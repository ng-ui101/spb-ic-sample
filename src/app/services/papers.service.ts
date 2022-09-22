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

    private _setHttpParams(q: string, sort: string, order: string, page: number, limit: number, type: string, paperId: string) {
        let params = new HttpParams()
            .set('_page', page.toString())
            .set('_limit', limit.toString());

        if (sort) {
            params = params.append('_sort', sort).append('_order', order);
        }

        if(q) {
            params = params.append('q', q);
        }

        if (type) {
            params = params.append('type', type);
        }

        if (paperId) {
            params = params.append('paperId_like', paperId);
        }

        return params;
    }

    public getPapers(
        q = '',
        sort = '',
        order = 'asc',
        page = 0,
        limit = 3,
        type = '',
        paperId = ''
    ): Observable<HttpResponse<any>> {
        return this.http.get(`${this._url}/papers`, {
            params: this._setHttpParams(q, sort, order, page, limit, type, paperId),
            // to get the number of records:
            observe: 'response'
        }).pipe(
            map((res) => res),
        );
    }
}
