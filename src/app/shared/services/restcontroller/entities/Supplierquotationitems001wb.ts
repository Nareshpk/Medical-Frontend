import { Supplierquotation001wb } from "./supplierquotation001wb ";

export class Supplierquotationitems001wb {

    slNo?: number;
    unitslno?: number;
     suplierslno?:number | any;
    itemcode?:number |any;
    itemname?: string;
    descrip?: string;
    qunty?: string;
    uom?: string;
    hsn?: string | null;;
    unitrate?: string;
    totalamount?: number | any;
   
    cucode?:number;
    cuname?: string;
    cudescrip?: string;
    cuqunty?: string;
    cuom?: string;
    chsn?: string | null;;
    cunitrate?: string;
    cutotalamount?:  number | any;
    cptcode?:number |any;
    cptname?: string;
    cptdescrip?: string;
    cptqunty?: string;
    cptuom?: string;
    cpthsn?: string | null;;
    cptunitrate?: string;
    cpttotalamount?: number | any;
   
    prtcode?:number;
    prtmname?: string;
    prtdescrip?: string;
    prtqunty?: string;
    prtuom?: string;
    prthsn?: string | null ;
    prtunitrate?: string;
    prttotalamount?:  number | any;
    
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    orderitemSlno:any;
    suplierslno2?:Supplierquotation001wb[];
   
   
   }