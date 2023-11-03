import { Purchasereqitem001wb } from "./purchasereqitems001wb";
import { Spares001mb } from "./spares001mb";
import { Suppliertype001mb } from "./Suppliertype001mb";

export class Purchasereqslip001wb {
    slNo?: number;
    unitslno?: number;
    date?: Date;
    prsNo?: string | any;
    poDate?: Date;
    reqDate?: Date;
    poNo?: string | any;
    remarks?: string;
    suppliertype?:string | any;
    status?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    // purchasereqitem?: Purchasereqitem001wb[] | any;
    purchasereqitem001wbs?:Purchasereqitem001wb[]|any;
    sslno2:Suppliertype001mb[] | any;
}
