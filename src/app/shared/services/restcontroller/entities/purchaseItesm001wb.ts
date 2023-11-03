import { Purchaseinvoicepay001wb } from "./purchaseinvoicepay001wb";


export class PurchaseItem001wb {
    slNo?: number;
    unitslno?: number;
    purchaseslno?: number | any;
    itemcode?: number | any;
    itemname?: string;
    descrip?: string;
    qunty?: string;
    uom?: string;
    hsn?: string | null;;
    unitrate?: string;
    totalamount?: number;

    cucode?: number;
    cuname?: string;
    cudescrip?: string;
    cuqunty?: string;
    cuom?: string;
    chsn?: string | null;;
    cunitrate?: string;
    cutotalamount?: number;

    cptcode?: number | any;
    cptname?: string;
    cptdescrip?: string;
    cptqunty?: string;
    cptuom?: string;
    cpthsn?: string | null;;
    cptunitrate?: string;
    cpttotalamount?: number;

    prtcode?: number;
    prtmname?: string;
    prtdescrip?: string;
    prtqunty?: string;
    prtuom?: string;
    prthsn?: string | null;
    prtunitrate?: string;
    prttotalamount?: number;

    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    suplierslno2?: Purchaseinvoicepay001wb[];
}
