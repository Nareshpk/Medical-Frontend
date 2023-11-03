import { Partspecific001wb } from "./partspecifc001wb";

export class Part001mb {
    slNo?: number | any;
    unitslno?: number;
    partno?: string;
    partname?: string;
    hsn?: string;
    splan?: string;
    descrip?: string;
    qunty?: string;
    unitamount?: number | any;
    uom?: string;
    gst?: number;
    location?: string;
    mslevel?: string;
    orderlevel?: string;
    leadtime?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    // partspecific?:Partspecific001wb[] | any;
    partspecific001wbs:Partspecific001wb[] | any;
  
}

