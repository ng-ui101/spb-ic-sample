import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {IPaper} from "../interfaces/papers";
import {BehaviorSubject, catchError, finalize, map, Observable, of} from "rxjs";
import {PapersService} from "../services/papers.service";
import {HttpResponse} from "@angular/common/http";

export class PapersDataSource implements DataSource<IPaper> {
    private papersSubject = new BehaviorSubject<IPaper[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    private _total: number = 0;

    public get total() {
        return this._total;
    }

    constructor(
        private _papersService: PapersService
    ) {
    }

    public connect(collectionViewer: CollectionViewer): Observable<IPaper[]> {
        return this.papersSubject.asObservable();
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this.papersSubject.complete();
        this.loadingSubject.complete();
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
        this.loadingSubject.next(true);

        if (paperId !== '') {
            paperId = `^${paperId}`;
        }

        this._papersService.getPapers(sort, order, page, limit, type, paperId, showArchival)
            .pipe(
                catchError(() => of([])),
                map((papers) => papers as HttpResponse<any>),
                finalize(() => this.loadingSubject.next(false)),
            ).subscribe((papers) => {
                this._total = +papers.headers.getAll('X-Total-Count');
                this.papersSubject.next(papers['body']);
            }
        );
    }
}
