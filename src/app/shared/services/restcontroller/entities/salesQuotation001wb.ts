import { Custemer001wb } from "./Custemer001wb";
import { Custemerregistration001mb } from "./Custemerregistration001mb";
import { Partitem001wb } from "./Partitem001wb";

export class SalesQuotation001wb {
    slNo?: number;
    unitslno?: number;
    custmrSlno?: number;
    custemerCode?: string |any;
    sInvoice?: string|any;
    date?: Date;
    consignee?: string;
    cDate?: Date;
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
    custemerSlno2?: Custemer001wb[];
    partitem001wbs?: Partitem001wb[] | any;
    
} 