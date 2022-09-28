import {Component, HostBinding, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IPaper, PaperType, departments} from "../../interfaces/papers";
import {FormBuilder} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {CUSTOM_DATE_FORMAT} from "../../localization/custom-date-format";

@Component({
    selector: 'app-paper-edit-dialog',
    templateUrl: './paper-edit-dialog.component.html',
    styleUrls: ['./paper-edit-dialog.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT}
    ],
    encapsulation: ViewEncapsulation.None
})
export class PaperEditDialogComponent {
    @HostBinding('class.modal-dialog') private _modalDialog = true;

    public paper: IPaper = null;
    public departments: string[] = departments;
    public codeMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    public PaperType = PaperType;

    public paperForm = this._formBuilder.group({
        id: '',
        isMain: false,
        isArchival: false,
        type: '',
        serial: '',
        paperId: '',
        issueDate: null,
        issuingDepartment: '',
        departmentCode: ''
    });

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<PaperEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IPaper,
    ) {
        if (data) {
            this.paperForm.patchValue(data);
        } else {
            this.paperForm.patchValue({
                issueDate: new Date()
            });
        }
    }

    public confirm() {
        this.dialogRef.close(this.paperForm.value);
    }

    public exit() {
        this.dialogRef.close();
    }
}
