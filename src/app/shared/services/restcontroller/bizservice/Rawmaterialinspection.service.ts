import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Rawmaterialinspection001wb } from "../entities/Rawmaterialinspection001wb";




@Injectable()
export class RawmaterialinspectionManager extends BaseService {
    private rawmaterialUrl: string = `${environment.apiUrl}/Rawmaterialinspection`



    allrawmaterial(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.rawmaterialUrl}` + "/findAll", data);
    }


   
    findByItem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.rawmaterialUrl}` + "/findByItem", data);
    } 
    findByConsumableItem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.rawmaterialUrl}` + "/findByConsumableItem", data);
    }
    findByChildItem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.rawmaterialUrl}` + "/findByChildItem", data);
    }
    findByPartItem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.rawmaterialUrl}` + "/findByPartItem", data);
    }
    
    
    

    findNotificationAll() {
        return this.getCallService(`${this.rawmaterialUrl}` + "/findNotificationAll");
    }
    
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.rawmaterialUrl}`, data);
    }

    rawmaterialsave(rawmaterialinspection001wb : Rawmaterialinspection001wb ) {
    return this.postCallService(`${this.rawmaterialUrl}` + "/save", {}, rawmaterialinspection001wb );
    }
  
    rawmaterialUpdate(rawmaterialinspection001wb: Rawmaterialinspection001wb) {
        return this.putCallService(`${this.rawmaterialUrl}` + "/update", {}, rawmaterialinspection001wb);
    }
  

    rawmaterialDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.rawmaterialUrl}` + "/delete", data);
    }

    

    itemStockPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/itemStockpdf", data)
    }
    itemStockExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/itemStockexcel", data)
    }

    consumableStockPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/consumableStockpdf", data)
    }
    consumableStockExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/consumablStockexcel", data)
    }

    childPartStockPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/childPartStockpdf", data)
    }
    childPartStockExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/childPartStockexcel", data)
    }


    PartStockPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/partStockpdf", data)
    }
    PartStockExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/partStockexcel", data)
    }
    
    itemPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/itempdf", data)
    }
    itemExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/itemexcel", data)
    }

    consumablePdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/consumablepdf", data)
    }
    consumableExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/consumablexcel", data)
    }

    childPartPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/childPartpdf", data)
    }
    childPartExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/childPartexcel", data)
    }


    PartPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/partpdf", data)
    }
    PartExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.rawmaterialUrl}` + "/partexcel", data)
    }

}