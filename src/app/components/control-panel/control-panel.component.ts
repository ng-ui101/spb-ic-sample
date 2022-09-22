import {Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IPaper, PaperType} from "../../interfaces/papers";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ControlPanelComponent implements OnInit {
    @HostBinding('class.control-panel') private _controlPanel = true;

    @Input() public currentPaper: IPaper = null;

    @Output() public paperTypeIsChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() public idIsChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() public archivalVisibilityIsChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() public deletePaper: EventEmitter<any> = new EventEmitter<any>();

    public PaperType = PaperType;

    public showArchival: boolean = true;

    public searchForm = this._formBuilder.group({
        paperId: '',
    });

    constructor(
        private _formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
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
    }

    public changeArchivalVisibility() {
        this.showArchival = !this.showArchival;
        this.archivalVisibilityIsChanged.emit(this.showArchival);
    }

    public delete() {
        this.deletePaper.emit()
    }
}
