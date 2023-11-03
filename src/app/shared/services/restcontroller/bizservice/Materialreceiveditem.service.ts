import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Materialreceiveditem001wb } from "../entities/Materialreceiveditem001wb";




@Injectable()
export class MaterialreceiveditemManager extends BaseService {
    private receiveditemUrl: string = `${environment.apiUrl}/receiveditem`



    allreceiveditem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.receiveditemUrl}` + "/findAll",data);
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.receiveditemUrl}`, data);
    }

    receiveditemsave(materialreceiveditem001wb : Materialreceiveditem001wb ) {
    return this.postCallService(`${this.receiveditemUrl}` + "/save", {}, materialreceiveditem001wb );
    }
  
    receiveditemUpdate(materialreceiveditem001wb: Materialreceiveditem001wb[]) {
        return this.putCallService(`${this.receiveditemUrl}` + "/update", {}, materialreceiveditem001wb);
    }
  

    receiveditemDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.receiveditemUrl}` + "/delete", data);
    }

}