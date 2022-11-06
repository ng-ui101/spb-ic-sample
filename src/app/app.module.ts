import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PapersListComponent} from './components/papers-list/papers-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {HttpClientModule} from "@angular/common/http";
import {ENVIRONMENT} from "./services/environment.service";
import {environment} from "../environments/environment";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PaperNamePipe} from './pipes/paper-name.pipe';
import {ControlPanelComponent} from './components/control-panel/control-panel.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {PaperEditDialogComponent} from './components/paper-edit-dialog/paper-edit-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {TextMaskModule} from 'angular2-text-mask';
import {getRuPaginator} from "./localization/mat-table-paginator";
import {DepartmentsService, DepartmentsServiceStub} from "./services/departments.service";
import {PapersService, PapersServiceStub} from "./services/papers.service";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
    declarations: [
        AppComponent,
        PapersListComponent,
        PaperNamePipe,
        ControlPanelComponent,
        PaperEditDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatIconModule,
        TextMaskModule,
        NgSelectModule
    ],
    providers: [
        {provide: ENVIRONMENT, useValue: environment},
        {provide: MatPaginatorIntl, useValue: getRuPaginator()},
        {provide: DepartmentsService,  useClass: DepartmentsServiceStub},
        {provide: PapersService,  useClass: PapersServiceStub},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
