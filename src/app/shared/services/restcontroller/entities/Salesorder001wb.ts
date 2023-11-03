import { Purchaseorder001wb } from "./Purchaseorder001wb";

export class Salesorder001wb {
    slNo?: number; 
    unitslno?: number;
    porderSlno?: number;
    invoiceNo?: string;
    date?: Date;
    deliveryNote?: string;
    modePay?: string;
    refNoDate?: string;
    otherRef?: string;
    buyerOrderNo?: string;
    buyerDate?: Date;
    dispatchDocNo?: string;
    deliveryNoteDate?: string;
    dispatchThrough?: string;
    destination?: string;
    billOfLading?: string;
    motorvehicleNo?: string;
    termsDelivery?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    porderSlno2? : Purchaseorder001wb;
}