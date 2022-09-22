export interface IPaper {
    id: string;
    type: PaperType;
    serial?: string;
    paperId: string;
    issueDate?: Date;
    issuingDepartment?: string;
    departmentCode: string;
    isMain?: boolean;
    isArchival: boolean;
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
