import { ChildPart001mb } from "./ChildPart001mb";
import { Consumble001mb } from "./Consumble001mb";
import { Materialinward001wb } from "./Materialinward001wb";
import { Orderitem001mb } from "./Orderitem001mb";
import { Part001mb } from "./Part001mb";


export class Materialreceiveditem001wb {
    slNo?: number;
    unitslno?: number;
    materialSlno?: number|any;
    itemcode?:  number;
    itemname?: string;
    qunty?: string;
    unitrate?: string;
    totalamount: number | any;
    
    receivedQty?: number;
    acceptedQty?: number;
    rejectedQty?: number;
    outstanding?: number;

    cureceivedQty?: number;
    cuacceptedQty?: number;
    curejectedQty?: number;
    cuoutstanding?: number;

    cptreceivedQty?: number;
    cptacceptedQty?: number;
    cptrejectedQty?: number;
    cptoutstanding?: number;

    prtreceivedQty?: number;
    prtacceptedQty?: number;
    prtrejectedQty?: number;
    prtoutstanding?: number;

    descrip?:string;
    cudescrip?:string;
    cptdescrip?:string;
    prtdescrip?:string;

    cucode?:number;
    cuname?: string;
    cuqunty?: string;
    cunitrate?: string;
    cutotalamount?: number; 
   
    cptcode?:number |any;
    cptname?: string;
    cptqunty?: string;
    cptunitrate?: string;
    cpttotalamount?: number;
   
    prtcode?:number;
    prtmname?: string;
    prtqunty?: string;
    prtunitrate?: string;
    prttotalamount?: number;

    location?: string;
    mslevel?: string;
    orderlevel?: string;
    leadtime?: string;

    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    materialSlno2?:Materialinward001wb;
    itemcode2?:Orderitem001mb[] | any;
    cucode2?: Consumble001mb[];
    cptcode2?:ChildPart001mb[];
    prtcode2?: Part001mb[];
   
}
