import {Component, HostBinding, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IPaper, PaperType} from "../../interfaces/papers";
import {FormBuilder} from "@angular/forms";
import {DepartmentsService} from "../../services/departments.service";

@Component({
    selector: 'app-paper-edit-dialog',
    templateUrl: './paper-edit-dialog.component.html',
    styleUrls: ['./paper-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaperEditDialogComponent {
    @HostBinding('class.modal-dialog') private _modalDialog = true;

    public paper: IPaper = null;
    public departments: string[] = [];
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
        private _departmentsService: DepartmentsService,
        public dialogRef: MatDialogRef<PaperEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IPaper,
    ) {
        this._departmentsService.getDepartments()
            .subscribe((departments) => this.departments = departments);

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
