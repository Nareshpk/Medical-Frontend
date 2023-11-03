import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { MaterialStock001wb } from "../entities/stock001wb";


@Injectable()
export class MaterialStockManager extends BaseService {

    private MaterialStockUrl: string = `${environment.apiUrl}/materialstock`

    materialstockfindall(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.MaterialStockUrl}` + "/findAll", data);
    }


    materialstockSave(materialStock001wb: MaterialStock001wb) {        
        return this.postCallService(`${this.MaterialStockUrl}` + "/save", {}, materialStock001wb);
    }

    materialstockUpdate(materialStock001wb: MaterialStock001wb) {
        return this.putCallService(`${this.MaterialStockUrl}` + "/update", {}, materialStock001wb);
    }

    materialstockDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.MaterialStockUrl}` + "/delete", data);
    }
    
    itemPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialStockUrl}` + "/itempdf", data)
    }
    iemExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialStockUrl}` + "/itemexcel", data)
    }

    consumablePdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialStockUrl}` + "/consumablepdf", data)
    }
    consumableExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialStockUrl}` + "/consumablexcel", data)
    }

    childPartPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialStockUrl}` + "/childPartpdf", data)
    }
    childPartExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialStockUrl}` + "/childPartexcel", data)
    }


    PartPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialStockUrl}` + "/partpdf", data)
    }
    PartExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialStockUrl}` + "/partexcel", data)
    }

    


}