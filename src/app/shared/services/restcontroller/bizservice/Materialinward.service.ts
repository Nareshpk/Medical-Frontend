import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Materialinward001wb } from "../entities/Materialinward001wb";


@Injectable()
export class MaterialInwardManager extends BaseService {

    private MaterialInwardUrl: string = `${environment.apiUrl}/materialinward`

    allinward(unitslno:number) {
        let data: any ={};
        data['unitslno'] =unitslno;
        return this.getCallService(`${this.MaterialInwardUrl}` + "/findAll",data);
    }

    getCount() {
        return this.getCallService(`${this.MaterialInwardUrl}` + "/getCount");
    }

   findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.MaterialInwardUrl}`, data);
    }

    inwardSave(materialinward001wb: Materialinward001wb) {
        return this.postCallService(`${this.MaterialInwardUrl}` + "/save", {}, materialinward001wb);
    }

    inwardUpdate(materialinward001wb: Materialinward001wb) {
        return this.putCallService(`${this.MaterialInwardUrl}` + "/update", {}, materialinward001wb);
    }

    inwardDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.MaterialInwardUrl}` + "/delete", data);
    }

    UpdateMaterialinward(approvel:any, materialSlno:any, remarks:any) {
        let data: any = {};
        data['approvel'] = approvel;
        data['materialSlno'] = materialSlno;
        data['remarks'] = remarks;
        return this.getCallService(`${this.MaterialInwardUrl}` + "/UpdateMaterialinward", data);
    }


    materialinwardPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialInwardUrl}` + "/pdf", data)
    }
    materialinwardExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialInwardUrl}` + "/excel", data)
    }

    pdfId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.MaterialInwardUrl}` + "/pdf", data)
    }

    ExcelId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.MaterialInwardUrl}` + "/excel", data)
    }

    approvalStatus() {
        return this.getCallService(`${this.MaterialInwardUrl}` + "/approvalStatus");
    }

    submitStatusUpdate() {
        return this.getCallService(`${this.MaterialInwardUrl}` + "/submitStatusUpdate/", );
    }


}