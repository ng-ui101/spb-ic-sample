import {Component, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewEncapsulation} from '@angular/core';
import {IPaper, IPaperSearchForm, PaperType} from "../../interfaces/papers";
import {FormBuilder} from "@angular/forms";
import {PaperEditDialogComponent} from "../paper-edit-dialog/paper-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ControlPanelComponent implements OnDestroy {
    @HostBinding('class.control-panel') private _controlPanel = true;

    @Input() public currentPaper: IPaper = null;

    @Output() public search: EventEmitter<IPaperSearchForm> = new EventEmitter<IPaperSearchForm>();
    @Output() public showArchival: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public clearSearchResult: EventEmitter<void> = new EventEmitter<void>();

    @Output() public deletePaper: EventEmitter<void> = new EventEmitter<void>();
    @Output() public createPaper: EventEmitter<any> = new EventEmitter<any>();
    @Output() public changePaper: EventEmitter<any> = new EventEmitter<any>();

    public archivalIsVisible: boolean = false;
    public PaperType = PaperType;

    public searchForm = this._formBuilder.group({
        paperId: '',
        paperType: ''
    });

    private _sub: Subscription = Subscription.EMPTY;

    constructor(
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
    ) {
    }

    public ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    public onSubmit() {
        this.search.emit(this.searchForm.value as IPaperSearchForm);
    }

    public clearSearchString() {
        this.searchForm.patchValue({paperId: '', paperType: ''});
        this.archivalIsVisible = false;
        this.clearSearchResult.emit();
    }

    public changeArchivalVisibility() {
        this.archivalIsVisible = !this.archivalIsVisible;
        this.showArchival.emit(this.archivalIsVisible);
    }

    public delete() {
        this.deletePaper.emit()
    }

    public editPaper() {
        this.openDialog(this.currentPaper);
    }

    public addPaper() {
        this.openDialog();
    }

    private openDialog(paper: IPaper = null) {
        const dialogRef = this.dialog.open(PaperEditDialogComponent, {
            width: '1024px',
            data: paper || null,
            panelClass: 'dialog-layout'
        });

        this._sub = dialogRef.afterClosed().subscribe((formData) => {
            if (!formData) {
                return;
            }

            if (formData.id) {
                this.changePaper.emit(formData);
            } else {
                this.createPaper.emit(formData);
            }
        });
    }
}
