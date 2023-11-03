import { Breakdown001mb } from "./Breakdown001mb";
import { Machine001mb } from "./Machine001mb";
import { Preventiveaction001mb } from "./preventiveaction001mb";
import { Rootcause001mb } from "./Rootcause001mb";
import { Spares001mb } from "./spares001mb";

export class Breakdownreg001wb {
    slNo?: number;
    unitslno?: number;
    mslno?: number;
    date?: Date;
    bdsl?: number;
    rcsl?: number;
    pasl?: number;
    filename?: string;
    filepath?: string;
    originalfilename?: string;
    startTime?: string | null;
    endTime?: string | null;
    sslno?: number;
    spareCost?: number;
    sparesQty?: number;
    attendby?: string;
    remarks?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    mslno2?: Machine001mb;
    bdsl2?: Breakdown001mb;
    rcsl2?: Rootcause001mb;
    pasl2?: Preventiveaction001mb;
    sslno2?: Spares001mb;
}