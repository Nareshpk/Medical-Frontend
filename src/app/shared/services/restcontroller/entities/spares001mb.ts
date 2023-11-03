import { Suppliertype001mb } from "./Suppliertype001mb";

export class Spares001mb {
    slNo?: number;
    unitslno?: number;
    sslno?: number;
    msslno?: number;
    mname?: string;
    spares?: string;
    sparescost?: number | null;
    specification?: string;
    leadtime?: string;
    minimumstocklevel?: number | null;
    reorderlevel?: number | null;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    sslno2:Suppliertype001mb[] | any;
}