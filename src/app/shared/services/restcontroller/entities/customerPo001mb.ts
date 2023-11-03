import { CustomerPoItem001wb } from "./customerPoItem001wb";

export class CustomerPoMaster001mb {
    slNo?: number;
    unitslno: number | any;
    custemercode: number | any;
    custemername?: string ;
    custemerPONo?: string;
    poDate?: Date | null;
    deliveryDate?: Date | null;
    packing?: string;
    logistic?: string;
    inspection?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    customerpoitem001wbs?:CustomerPoItem001wb[]|any;

}