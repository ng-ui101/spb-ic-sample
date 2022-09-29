import {Pipe, PipeTransform} from '@angular/core';
import {PaperType} from "../interfaces/papers";

@Pipe({
    name: 'paperName'
})
export class PaperNamePipe implements PipeTransform {
    // it is a stub:
    transform(value: unknown, ...args: unknown[]): unknown {
        switch (value) {
            case PaperType.Passport:
                return 'паспорт гражданина РФ';
            case PaperType.InternationalPassport:
                return 'загран. паспорт гражданина';
            case PaperType.BirthCertificate:
                return 'свидетельство о рождении';
            default:
                return 'документ';
        }
    }

}
