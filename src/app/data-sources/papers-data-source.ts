import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {IPaper} from "../interfaces/papers";
import {BehaviorSubject, catchError, finalize, map, Observable, of} from "rxjs";
import {PapersService} from "../services/papers.service";
import {HttpResponse} from "@angular/common/http";

export class PapersDataSource implements DataSource<IPaper> {
    public get loading$() {
        return this._loadingSubject$.asObservable();
    }

    public get total() {
        return this._total;
    }

    private _papersSubject$ = new BehaviorSubject<IPaper[]>([]);
    private _loadingSubject$ = new BehaviorSubject<boolean>(false);
    private _total: number = 0;

    constructor(
        private _papersService: PapersService
    ) {
    }

    public connect(collectionViewer: CollectionViewer): Observable<IPaper[]> {
        return this._papersSubject$.asObservable();
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this._papersSubject$.complete();
        this._loadingSubject$.complete();
    }

    public loadPapers(
        sort = '',
        order = 'asc',
        page = 0,
        limit = 5,
        type = '',
        paperId = '',
        showArchival = false
    ) {
        // json-server fix:
        page += 1;
        this._loadingSubject$.next(true);

        if (paperId !== '') {
            paperId = `^${paperId}`;
        }

        this._papersService.getPapers(sort, order, page, limit, type, paperId, showArchival)
            .pipe(
                catchError(() => of([])),
                map((papers) => papers as HttpResponse<any>),
                finalize(() => this._loadingSubject$.next(false)),
            ).subscribe((papers) => {
                this._total = +papers.headers.getAll('X-Total-Count');
                this._papersSubject$.next(papers['body']);
            }
        );
    }
}
