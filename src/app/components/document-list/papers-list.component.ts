import {AfterViewInit, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {PapersService} from "../../services/papers.service";
import {PapersDataSource} from "../../services/papers-data-source";
import {merge, tap} from "rxjs";
import {IPaper, PaperType} from "../../interfaces/papers";

@Component({
    selector: 'app-papers-list',
    templateUrl: './papers-list.component.html',
    styleUrls: ['./papers-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PapersListComponent implements OnInit, AfterViewInit {
    @HostBinding('class.papers-list') private _papersList = true;

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    public displayedColumns: string[] = ['isMain', 'type', 'serial', 'paperId', 'issueDate'];
    public dataSource: PapersDataSource;
    public selectedRowIndex: number = null;
    public selectedPaper: IPaper = null;

    private _currentPaperType: PaperType | string = '';
    private _currentIdSearchString: string = '';
    private _showArchival: boolean = true;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private _papersService: PapersService
    ) {
    }

    public ngOnInit(): void {
        this.dataSource = new PapersDataSource(this._papersService);
        this.dataSource.loadPapers('', 'asc', '', 0, 5, this._currentPaperType, this._currentIdSearchString, this._showArchival);
    }

    public ngAfterViewInit() {
        this._sort.sortChange.subscribe(() => this._paginator.pageIndex = 0);

        merge(this._sort.sortChange, this._paginator.page)
            .pipe(
                tap(() => this.loadPage())
            )
            .subscribe();
    }

    public loadPage() {
        this.selectedRowIndex = null;
        this.selectedPaper = null;

        this.dataSource.loadPapers(
            '',
            this._sort.active,
            this._sort.direction,
            this._paginator.pageIndex,
            this._paginator.pageSize,
            this._currentPaperType,
            this._currentIdSearchString,
            this._showArchival
        );
    }

    public searchByPaperType(type: PaperType) {
        this.selectedRowIndex = null;
        this.selectedPaper = null;

        this._currentPaperType = type;
        this.dataSource.loadPapers('', 'asc', '', 0, 5, this._currentPaperType, this._currentIdSearchString, this._showArchival);
    }

    public searchById(id: string) {
        this.selectedRowIndex = null;
        this.selectedPaper = null;

        this._currentIdSearchString = id;
        this.dataSource.loadPapers('', 'asc', '', 0, 5, this._currentPaperType, this._currentIdSearchString, this._showArchival);
    }

    public searchArchival(show: boolean) {
        this.selectedRowIndex = null;
        this.selectedPaper = null;

        this._showArchival = show;
        this.dataSource.loadPapers('', 'asc', '', 0, 5, this._currentPaperType, this._currentIdSearchString, this._showArchival);
    }

    public getPaper(paper: IPaper, index: number) {
        this.selectedRowIndex = index;
        this.selectedPaper = paper;
        console.log(paper)
    }

    public deletePaper() {
        this._papersService.deletePaper(this.selectedPaper).subscribe(() => this.loadPage());
    }

    public announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer
                .announce(`Сортировка ${sortState.direction === 'asc' ? 'по возрастанию' : 'по убыванию'} закончена`);
        } else {
            this._liveAnnouncer.announce('Сортировка очищена');
        }
    }
}

