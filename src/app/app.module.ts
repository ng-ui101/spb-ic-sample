import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PapersListComponent} from './components/document-list/papers-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {ENVIRONMENT} from "./services/environment.service";
import {environment} from "../environments/environment";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { PaperNamePipe } from './pipes/paper-name.pipe';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        PapersListComponent,
        PaperNamePipe,
        ControlPanelComponent
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
        ReactiveFormsModule
    ],
    providers: [{ provide: ENVIRONMENT, useValue: environment }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
