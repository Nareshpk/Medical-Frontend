import { CustomerPoMaster001mb } from "./customerPo001mb";

export class CustomerPoItem001wb {
    slNo?: number | any;
    customerpoSlno?: number| any;
    prtcode?: number;
    prtmname?: string;
    prtdescrip?: string;
    prtqunty?: string;
    prtuom?: string;
    prthsn?: string;
    prtunitrate?: string;
    prttotalamount: number | any;
    drawingNo: string | any;
    revisionNo: string | any;
    revisionDate?: Date | null;
    hsn: string | any;
    gst: string | any;

    insertUser?: string;
    insertDatetime?:Date | null;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    customerpoSlno2?:CustomerPoMaster001mb;
}