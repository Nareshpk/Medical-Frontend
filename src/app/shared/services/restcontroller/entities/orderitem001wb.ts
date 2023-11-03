import { Orderitem001mb } from "./Orderitem001mb";
import { Purchaseorder001wb } from "./Purchaseorder001wb";

export class Orderitem001wb {
    slNo?: number;
    unitslno?: number;
     purchaseslno?:number |any;
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
    cpttotalamount?:  number | any;
   
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
    // orderslno2?:Orderitem001mb;
    purchaseslno2?:Purchaseorder001wb;
}
