import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnvironmentService} from "./environment.service";
import {IPaper} from "../interfaces/papers";
import {v4 as uuid} from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class PapersService {

    private readonly _url: string = null;

    constructor(
        private http: HttpClient,
        private _environmentService: EnvironmentService,
    ) {
        this._url = this._environmentService.getValue('apiUrl');
    }

    private _setHttpParams(sort: string, order: string, page: number, limit: number, type: string, paperId: string, showArchival: boolean) {
        let params = new HttpParams()
            .set('_page', page.toString())
            .set('_limit', limit.toString());

        if (sort) {
            params = params.append('_sort', sort).append('_order', order);
        }

        if (type) {
            params = params.append('type', type);
        }

        if (paperId) {
            params = params.append('paperId_like', paperId);
        }

        if (!showArchival) {
            params = params.append('isArchival_ne', true);
        }

        return params;
    }

    public getPapers(
        sort: string,
        order: string,
        page: number,
        limit: number,
        type: string,
        paperId: string,
        showArchival: boolean
    ): Observable<HttpResponse<any>> {
        /*
        * '/data', because with '/papers' url json-server will delete all papers
        * see bug info: https://github.com/typicode/json-server/issues/885
        */
        return this.http.get(`${this._url}/data`, {
            params: this._setHttpParams(sort, order, page, limit, type, paperId, showArchival),
            // to get the number of records:
            observe: 'response'
        });
    }

    public deletePaper(paper: IPaper) {
        return this.http.delete(`${this._url}/data/${paper.id}`);
    }

    public addPaper(paperData: any) {
        return this.http.post(`${this._url}/data`, {...paperData, id: uuid()});
    }

    public updatePaper(paper: IPaper) {
        return this.http.put(`${this._url}/data/${paper.id}`, paper);
    }
}
