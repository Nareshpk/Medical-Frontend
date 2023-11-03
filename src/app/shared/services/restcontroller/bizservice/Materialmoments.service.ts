import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Materialmoments001wb } from "../entities/Materialmoments001wb";

@Injectable()
export class MaterialMomentsManager extends BaseService {
    private MaterialmomentsUrl: string = `${environment.apiUrl}/materialmoments`

    allMaterial(unitslno:number) {
        let data: any ={};
        data['unitslno'] =unitslno;
        return this.getCallService(`${this.MaterialmomentsUrl}` + "/findAll", data);
    }


    Materialsave(materialmoments001wb: Materialmoments001wb) {
        return this.postCallService(`${this.MaterialmomentsUrl}` + "/save", {}, materialmoments001wb);
    }

    MaterialUpdate(materialmoments001wb: Materialmoments001wb) {
        return this.putCallService(`${this.MaterialmomentsUrl}` + "/update", {}, materialmoments001wb);
    }

    MaterialDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.MaterialmomentsUrl}` + "/delete", data);
    }
    MaterialPdf(mslNo: any,unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/pdf", data)
    }
    MaterialExcel(mslNo: any, unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/excel", data)
    }

    itemPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/itempdf", data)
    }
    iemExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/itemexcel", data)
    }

    consumablePdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/consumablepdf", data)
    }
    consumableExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/consumablexcel", data)
    }

    childPartPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/childPartpdf", data)
    }
    childPartExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/childPartexcel", data)
    }


    PartPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/partpdf", data)
    }
    PartExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialmomentsUrl}` + "/partexcel", data)
    }

}