import { Custemer001wb } from "./Custemer001wb";
import { Custemerregistration001mb } from "./Custemerregistration001mb";

export class Salesinvoice001wb {
    slNo?: number;
    unitslno?: number;
    custmrSlno?: number;
    custemerCode?: string |any;
    sInvoice?: string|any;
    date?: Date;
    consignee?: string;
    cDate?: Date |null;
    refno?: string;
    pono?: string;
    remarks?: string | null;
    statusSlno?: number | null;
    otherRef?: string;
    dispatchThrough?: string;
    destination?: string;
    termsDelivery?: string;
    supplierFrom?: string;
    hsn?: string;
    dueOn?: Date;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    custmrSlno2?:Custemerregistration001mb;
    custemer001wbs?: Custemer001wb[]|any;
} 