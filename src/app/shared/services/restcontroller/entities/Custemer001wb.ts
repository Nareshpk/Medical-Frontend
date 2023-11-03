import { Salesinvoice001wb } from "./Salesinvoice001wb";
import { Salesitem001mb } from "./Salesitemmb";

export class Custemer001wb {
    slNo?: number;
    unitslno?: number;
    salespartSlno?: number;
    prtcode?: number;
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
    
    salespartSlno2?:Salesinvoice001wb;
}
 