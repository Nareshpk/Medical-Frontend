import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { ChildPart001mb } from "../entities/ChildPart001mb";


@Injectable()
export class ChildPartManager extends BaseService {
    private ChildPartUrl: string = `${environment.apiUrl}/childpart`
    

    allChildpart(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.ChildPartUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.ChildPartUrl}`, data);
    }

    ChildpartSave(childPart001mb: ChildPart001mb) {
        return this.postCallService(`${this.ChildPartUrl}` + "/save", {}, childPart001mb);
    }

    ChildpartUpdate(childPart001mb: ChildPart001mb) {        
        return this.putCallService(`${this.ChildPartUrl}` + "/update", {}, childPart001mb);
    }
    getCount() {
        return this.getCallService(`${this.ChildPartUrl}` + "/getCount");
    }

    ChildpartDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.ChildPartUrl}` + "/delete", data);
    }

    ChildpartPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.ChildPartUrl}` + "/pdf", data)
    }
    
    ChildpartExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.ChildPartUrl}` + "/excel", data)
    }
}