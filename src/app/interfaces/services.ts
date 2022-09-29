import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {IPaper, IPaperSearchParams} from "./papers";

export interface IDepartmentsService {
    getDepartments(): Observable<string[]>;
}

export interface IPapersService {
    getPapers(params: IPaperSearchParams): Observable<HttpResponse<any>>;
    deletePaper(paper: IPaper): Observable<Object>;
    addPaper(paperData: any): Observable<Object>;
    updatePaper(paper: IPaper): Observable<Object>;
}
