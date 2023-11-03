import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Materialinspection001wb } from "../entities/MaterialInspection001wb";


@Injectable()
export class MaterialInspectionManager extends BaseService {

    private MaterialInspectionUrl: string = `${environment.apiUrl}/materialinspect`

    materialinspectionfindall(unitslno:number) {
        let data: any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.MaterialInspectionUrl}` + "/findAll",data);
    }


    materialinspectionSave(materialinspection001wb: Materialinspection001wb) {
        console.log("service---------->", materialinspection001wb);
        return this.postCallService(`${this.MaterialInspectionUrl}` + "/save", {}, materialinspection001wb);
    }

    materialinspectionUpdate(materialinspection001wb: Materialinspection001wb) {
        return this.putCallService(`${this.MaterialInspectionUrl}` + "/update", {}, materialinspection001wb);
    }

    materialinspectionDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.MaterialInspectionUrl}` + "/delete", data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.MaterialInspectionUrl}`, data);
    }
    materialinspectionPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;   
        return this.getCallService1(`${this.MaterialInspectionUrl}` + "/pdf", data)
    }
    materialinspectionExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.MaterialInspectionUrl}` + "/excel", data)
    }

    pdfId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialInspectionUrl}` + "/pdf", data)
    }

    ExcelId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.MaterialInspectionUrl}` + "/excel", data)
    }

    getCount() {
        return this.getCallService(`${this.MaterialInspectionUrl}` + "/getCount");
    }


}