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
    paperId: string;
    paperType: PaperType | '';
}

export interface IPaperSearchParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc' | '';
    type?: string;
    paperId?: string;
    showArchival?: boolean;
}

export enum PaperType {
    Passport = 'passport',
    InternationalPassport = 'international-passport',
    BirthCertificate = 'birth-certificate',
}
