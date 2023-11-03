import { ChildPart001mb } from "./ChildPart001mb";
import { Consumble001mb } from "./Consumble001mb";
import { Materialinspection001wb } from "./MaterialInspection001wb";
import { Observationsitems001wb } from "./Observationsitems001wb";
import { Orderitem001mb } from "./Orderitem001mb";
import { Part001mb } from "./Part001mb";


export class Rawmaterialinspection001wb {
    slNo?: number;
    rawmaterialslno?: number;
    unitslno?: number;
    itemcode?: number | any;
    itemname?: string;
    descrip?: string;
    cucode?: number;
    cuname?: string;
    cudescrip?: string;
    cptcode?: number;
    cptname?: string;
    cptdescrip?: string;
    prtcode?: number;
    prtname?: string;
    prtdescrip?: string;
    qunty?: number;
    cuqunty?: number;
    cptqunty?:number;
    prtqunty?: number;
    receivedQty?: number;
    acceptedQty?: number | any;
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

    location?: string;
    mslevel?: string;
    orderlevel?: string;
    leadtime?: string;
    opening?:number | any;
    closing?:number;
    acceptedsum:number | any;
    cuacceptedsum:number | any;
    prtacceptedsum:number | any;
    cptacceptedsum:number | any;
   
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    rawmaterialslno2?: Materialinspection001wb[];
    itemcode2?:Orderitem001mb[];
    cucode2?: Consumble001mb[];
    cptcode2?:ChildPart001mb[];
    prtcode2?: Part001mb[];
    observationsitems001wbs:  Observationsitems001wb[] | any;
}