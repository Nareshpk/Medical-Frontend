import { Materialreceiveditem001wb } from "./Materialreceiveditem001wb";
import { Purchaseorder001wb } from "./Purchaseorder001wb";

export class Materialinward001wb {
    slNo?: number;
    unitslno?: number;
    purchseSlno?: number;
    date?: Date;
    dcNo?: string|any;
    invoiceno?: string;
    grn?: string|any;;
    dcDate?: Date;
    supliername?: string;
    vehicleno?:string;
    drivername?:string;
    driverno?:string;
    remark?:string;
    remarks?: string | null;
    status?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    // metriealitems?: Materialreceiveditem001wb[]|any;
    materialreceiveditem001wbs: Materialreceiveditem001wb[]|any;
    purchseSlno2?:Purchaseorder001wb;
}