export interface IPaper {
    id: string;
    type: PaperType;
    serial?: string;
    paperId: string;
    issueDate?: Date;
    issuingDepartment?: string;
    departmentCode?: string;
    isMain?: boolean;
    isArchival: boolean;
}

export interface IPaperSearchForm {
    paperId?: string;
    paperType?: PaperType | '';
}

export enum PaperType {
    Passport = 'passport',
    InternationalPassport = 'international-passport',
    BirthCertificate = 'birth-certificate',
}

export const departments: string[] = [
    'ГУ МВД Первого района',
    'ГУ МВД Второго района',
    'ГУ МВД Третьего района'
]
