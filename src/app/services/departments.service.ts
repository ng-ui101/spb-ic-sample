import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {IDepartmentsService} from "../interfaces/services";

@Injectable({
    providedIn: 'root'
})
export class DepartmentsService implements IDepartmentsService{
    public getDepartments(): Observable<string[]> {
        // TODO: implement for real BE
        return of([]);
    }
}

@Injectable()
export class DepartmentsServiceStub implements IDepartmentsService{
    public getDepartments(): Observable<string[]> {
        return of([
            'ГУ МВД Первого района',
            'ГУ МВД Второго района',
            'ГУ МВД Третьего района'
        ]);
    }
}
