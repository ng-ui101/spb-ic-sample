import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnvironmentService} from "./environment.service";
import {IPaper, IPaperSearchParams} from "../interfaces/papers";
import {v4 as uuid} from 'uuid';
import {setPapersFilterParams} from "../utils/http-utils";
import {IPapersService} from "../interfaces/services";

@Injectable({
    providedIn: 'root'
})
export class PapersService implements IPapersService{
    // TODO: implement for real BE
    public addPaper(paperData: any): Observable<Object> {
        return undefined;
    }

    public deletePaper(paper: IPaper): Observable<Object> {
        return undefined;
    }

    public getPapers(params: IPaperSearchParams): Observable<HttpResponse<any>> {
        return undefined;
    }

    public updatePaper(paper: IPaper): Observable<Object> {
        return undefined;
    }
}

@Injectable()
export class PapersServiceStub implements IPapersService{

    private readonly _url: string = null;

    constructor(
        private _http: HttpClient,
        private _environmentService: EnvironmentService,
    ) {
        this._url = this._environmentService.getValue('apiUrl');
    }

    public getPapers(params: IPaperSearchParams): Observable<HttpResponse<any>> {
        /*
        * '/data', because with '/papers' url json-server will delete all papers
        * see bug info: https://github.com/typicode/json-server/issues/885
        */
        return this._http.get(`${this._url}/data`, {
            params: setPapersFilterParams(params),
            // to get the number of records:
            observe: 'response'
        });
    }

    public deletePaper(paper: IPaper) {
        return this._http.delete(`${this._url}/data/${paper.id}`);
    }

    public addPaper(paperData: any) {
        return this._http.post(`${this._url}/data`, {...paperData, id: uuid()});
    }

    public updatePaper(paper: IPaper) {
        return this._http.put(`${this._url}/data/${paper.id}`, paper);
    }
}
