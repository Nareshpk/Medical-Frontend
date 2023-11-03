import { Salesorder001wb } from "./Salesorder001wb";

export class Payment001wb {
    slNo?: number;
    unitslno?: number;
    date?: Date;
    tAmount?: number;
    paidAmount?: number;
    outAmount?: number;
    modeofPay?: string;
    chequeNo?: string;
    payIdno?: string;
    status?: string;
    dueDate?: Date;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    saleorderSlno2?: Salesorder001wb;
}