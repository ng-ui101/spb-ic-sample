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

@NgModule({
    declarations: [
        AppComponent,
        PapersListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        MatProgressSpinnerModule
    ],
    providers: [{ provide: ENVIRONMENT, useValue: environment }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
