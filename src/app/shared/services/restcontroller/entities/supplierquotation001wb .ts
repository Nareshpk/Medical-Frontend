import { Purchasereqitem001wb } from "./purchasereqitems001wb";
import { Purchasereqslip001wb } from "./Purchasereqslip001wb";
import { Supplierquotationitems001wb } from "./Supplierquotationitems001wb";

export class Supplierquotation001wb {

    slNo?: number;
    unitslno?: number;
  supplierSlno?: number|any;
  supliername?: string;
  supliertype?: string;
  address?: string;
  quotationNo?: string;
  quotationDate?: Date;
  validity?: Date;
  personName?: number;
  desgnation?: string;
  mnumber?: string;
  mobile?: string;
  mailid?: string;
  prsno?: number | any;
  department?: string;
  level?: string;
  termsCondition?: string;
  supplierSlno2: any;
  filename?: string;
  filepath?: string;
  originalfilename?: string;
  status?: string;
  remarks?: string;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;

  // supplierItems?:Supplierquotationitems001wb[] | any;
  supplierquotationitems001wbs:Supplierquotationitems001wb[] | any;
  prsno2?:Purchasereqitem001wb;
}