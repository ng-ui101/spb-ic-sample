import {AfterViewInit, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {PapersService} from "../../services/papers.service";
import {PapersDataSource} from "../../services/papers-data-source";
import {merge, tap} from "rxjs";

@Component({
    selector: 'app-papers-list',
    templateUrl: './papers-list.component.html',
    styleUrls: ['./papers-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PapersListComponent implements OnInit, AfterViewInit {
    @HostBinding('class.papers-list') papersList = true;

    displayedColumns: string[] = ['isMain', 'type', 'serial', 'paperID', 'issueDate'];
    dataSource: PapersDataSource;


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private _papersService: PapersService
    ) {
    }

    public ngOnInit(): void {
        this.dataSource = new PapersDataSource(this._papersService);
        this.dataSource.loadPapers('', 'asc', '', 0, 5);
    }

    public ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadPage())
            )
            .subscribe();
    }

    public loadPage() {
        this.dataSource.loadPapers(
            '',
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
        );
    }

    public announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Сортировка ${sortState.direction} закончена`);
        } else {
            this._liveAnnouncer.announce('Сортировка очищена');
        }
    }
}

