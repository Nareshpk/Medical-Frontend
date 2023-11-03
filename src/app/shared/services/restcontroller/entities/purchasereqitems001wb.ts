import { ChildPart001mb } from "./ChildPart001mb";
import { Consumble001mb } from "./Consumble001mb";
import { Orderitem001mb } from "./Orderitem001mb";
import { Part001mb } from "./Part001mb";
import { Purchasereqslip001wb } from "./Purchasereqslip001wb";

export class Purchasereqitem001wb {

 slNo?: number| any;
 prslno?:number | any;
 unitslno?: number;
 orderslno?:number;
 itemcode?: string;
 itemname?: string;
 descrip?: string;
 qunty?: string;
 hsn?: string;
 uom?: string;
 unitrate?: string;
 totalamount: number | any;

 cucode?:number;
 cuname?: string;
 cudescrip?: string;
 cuqunty?: string;
 cuom?: string;
 chsn?: string;
 cunitrate?: string;
 cutotalamount: number | any;

 cptcode?:number;
 cptname?: string;
 cptdescrip?: string;
 cptqunty?: string;
 cptuom?: string;
 cpthsn?: string;
 cptunitrate?: string;
 cpttotalamount: number | any;

 prtcode?:number;
 prtmname?: string;
 prtdescrip?: string;
 prtqunty?: string;
 prtuom?: string;
 prthsn?: string;
 prtunitrate?: string;
 prttotalamount: number | any;
 
 insertUser?: string;
 insertDatetime?: Date;
 updatedUser?: string | null;
 updatedDatetime?: Date | null;
 orderitemSlno:any;
 prslno2?:Purchasereqslip001wb;
 orderslno2?:Orderitem001mb;
 cucode2?:Consumble001mb;
 cptcode2?:ChildPart001mb;
 prtcode2?:Part001mb;

}