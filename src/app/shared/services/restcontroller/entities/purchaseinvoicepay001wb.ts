import { PurchaseItem001wb } from "./purchaseItesm001wb";
import { Purchaseorder001wb } from "./Purchaseorder001wb";

export class Purchaseinvoicepay001wb {
    slNo?: number;
    cDate?: Date;
    unitslno?: number;
    poSlno?: number;
    prsNo?: number;
    grnNo?: number | any;
    suppliercode?: number;
    suppliername?: string |any;
    purchaseInvoice?: string|any;
    reqDate?: Date;
    incomingNo?: string |any;
    filename: string |any;
    filepath: string |any;
    originalfilename: string |any;
    status?: string;
    remarks?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    purchaseItem?:PurchaseItem001wb[] | any;
    poSlno2?: Purchaseorder001wb;

}