import {Component, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewEncapsulation} from '@angular/core';
import {IPaper, PaperType} from "../../interfaces/papers";
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
    @Input() public showArchival: boolean = false;
    @Input() public currentPaperType: PaperType | string = '';

    @Output() public paperTypeIsChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() public idIsChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() public archivalVisibilityIsChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() public deletePaper: EventEmitter<any> = new EventEmitter<any>();
    @Output() public createPaper: EventEmitter<any> = new EventEmitter<any>();
    @Output() public changePaper: EventEmitter<any> = new EventEmitter<any>();

    public PaperType = PaperType;


    public searchForm = this._formBuilder.group({
        paperId: '',
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

    public searchByID() {
        this.idIsChanged.emit(this.searchForm.value.paperId)
    }

    public changePaperType(type: PaperType) {
        this.paperTypeIsChanged.emit(type);
    }

    public clearSearchString() {
        this.searchForm.patchValue({paperId: ''});
        this.idIsChanged.emit(this.searchForm.value.paperId);

        this.paperTypeIsChanged.emit('');

        this.showArchival = false;
        this.archivalVisibilityIsChanged.emit(this.showArchival);
    }

    public changeArchivalVisibility() {
        this.showArchival = !this.showArchival;
        this.archivalVisibilityIsChanged.emit(this.showArchival);
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
