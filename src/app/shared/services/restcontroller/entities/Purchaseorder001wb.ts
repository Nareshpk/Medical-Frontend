import { Companydetails001mb } from "./Companydetails001mb";
import { Consignee001mb } from "./Consignee001mb";
import { Orderitem001wb } from "./orderitem001wb";
import { Salesorder001wb } from "./Salesorder001wb";
import { Supplierquotation001wb } from "./supplierquotation001wb ";


export class Purchaseorder001wb {
  slNo?: number|any;
  unitslno?: number;
  suplierSlno?: number | any;
  suplierName?: string;
  suplieraddress?:string;
  date?: Date;
  prsno?: number | any;
  pono?: string | any;
  remarks?: string | null;
  statusSlno?: number | null;
  qno?: string;
  dispatchThrough?: string;
  destination?: string;
  termsDelivery?: string;
  supplierFrom?: string;
  dueOn?: Date;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  status?: string;
  companySlno2?: Companydetails001mb;
  consigneeSlno2?: Consignee001mb;
  orderitemSlno2?: Orderitem001wb[]| any;
  orderitem001wbs?: Orderitem001wb[] | any;
}