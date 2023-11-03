import { BaseEntity } from "./BaseEntity";

export class Emailsignature001mb extends BaseEntity {
    emailSignatureId?: number;
    unitslno?: number;
    companyName?: string | null;
    companyWebsite?: string | null;
    country?: string | null;
    emailAddress?: string | null;
    employeeDesignation?: string | null;
    employeeId?: number | null;
    employeeName?: string | null;
    employeeNamePrefix?: string | null;
    logoLink?: string | null;
    mobileNumber?: number | null;
    phoneNumber?: number | null;
}