export interface IPaper {
    type: PaperType;
    serial?: string;
    paperID: string;
    issueDate?: Date;
    issuingDepartment?: IDepartment;
    isMain?: boolean;
    isArchival?: boolean;
}

export interface IDepartment {
    name: string;
    departmentCode: string;
}

export enum PaperType {
    Passport = 'passport',
    InternationalPassport = 'international-passport',
    BirthCertificate = 'birth-certificate',
}

export function toPaper(paper: any) {
    return {
        ...paper,
        isMain: paper?.isMain === 'true',
        isArchival: paper?.isArchival === 'true'
    }
}
