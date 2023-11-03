import { Observationsitems001wb } from "./Observationsitems001wb";
import { Rawmaterialinspection001wb } from "./Rawmaterialinspection001wb";

export class Materialinspection001wb {
    slNo?: number;
    unitslno?: number;
    iirno?: string | any;
    cdate?: Date | any;
    scname?: string;
    dcno?: string;
    refno?: string;
    pdate?: Date;
    cponumber?: string;
    sponumber?: string;
    grnumber?: number | any;
    remark?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    Rawmaterialinspection?:Rawmaterialinspection001wb[]| any;
    observationsitems001wbs:  Observationsitems001wb[]| any;

}
