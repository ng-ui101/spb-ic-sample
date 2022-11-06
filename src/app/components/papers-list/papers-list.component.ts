import {AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {PapersService} from "../../services/papers.service";
import {PapersDataSource} from "../../data-sources/papers-data-source";
import {merge, Subscription, tap} from "rxjs";
import {IPaper, IPaperSearchForm} from "../../interfaces/papers";

@Component({
    selector: 'app-papers-list',
    templateUrl: './papers-list.component.html',
    styleUrls: ['./papers-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PapersListComponent implements OnInit, AfterViewInit, OnDestroy {
    @HostBinding('class.papers-list') private _papersList = true;

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    public displayedColumns: string[] = ['isMain', 'type', 'serial', 'paperId', 'issueDate'];
    public dataSource: PapersDataSource;
    public selectedRowIndex: number = null;
    public selectedPaper: IPaper = null;
    public showArchival: boolean = false;

    private _searchFormState: IPaperSearchForm = {
        paperId: '',
        paperType: ''
    }

    private _sortSub: Subscription = Subscription.EMPTY;
    private _sortPaginatorSub: Subscription = Subscription.EMPTY;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private _papersService: PapersService
    ) {
    }

    public ngOnInit(): void {
        this.dataSource = new PapersDataSource(this._papersService);
        this.dataSource.loadPapers({
            type: this._searchFormState.paperType,
            paperId: this._searchFormState.paperId,
            showArchival: this.showArchival
        } )
    }

    public ngOnDestroy(): void {
        this._sortSub.unsubscribe();
        this._sortPaginatorSub.unsubscribe();
    }

    public ngAfterViewInit() {
        this._sortSub = this._sort.sortChange.subscribe(() => this._paginator.pageIndex = 0);

        this._sortPaginatorSub = merge(this._sort.sortChange, this._paginator.page)
            .pipe(
                tap(() => this.loadPage())
            ).subscribe();
    }

    public loadPage() {
        this.selectedRowIndex = null;
        this.selectedPaper = null;

        this.dataSource.loadPapers({
            sort: this._sort.active,
            order: this._sort.direction,
            page: this._paginator.pageIndex,
            limit: this._paginator.pageSize,
            type: this._searchFormState.paperType,
            paperId: this._searchFormState.paperId,
            showArchival: this.showArchival
        });
    }

    public search(searchData: IPaperSearchForm) {
        this._searchFormState = {
            ...searchData,
            paperId: searchData.paperId ? `^${searchData.paperId}` : ''
        }
        this._paginator.pageIndex = 0
        this.loadPage();
    }

    public searchArchival(show: boolean) {
        this.showArchival = show;
        this._paginator.pageIndex = 0
        this.loadPage();
    }

    public clearSearchResult() {
        this.showArchival = false;
        this._paginator.pageIndex = 0
        this._searchFormState = {
            paperId: '',
            paperType: ''
        };
        this.loadPage();
    }

    public getPaper(paper: IPaper, index: number) {
        this.selectedRowIndex = index;
        this.selectedPaper = paper;
    }

    public deletePaper() {
        this._papersService.deletePaper(this.selectedPaper).subscribe(() => this.loadPage());
    }

    public updatePaper(paper: IPaper) {
        this._papersService.updatePaper(paper).subscribe(() => this.loadPage());
    }

    public createPaper(formData: any) {
        this._papersService.addPaper(formData).subscribe(() => this.loadPage());
    }

    public announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer
                .announce(`Сортировка ${sortState.direction === 'asc' ? 'по возрастанию' : 'по убыванию'} закончена`);
        } else {
            this._liveAnnouncer.announce('Сортировка очищена');
        }
    }

    public changeFromSelect(e: any) {
        this._paginator.pageIndex = --e
        this.loadPage();
    }
}

