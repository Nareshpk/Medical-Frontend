import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Observationsitems001wb } from "../entities/Observationsitems001wb";




@Injectable()
export class ObservationsitemsManager extends BaseService {
    private rawmaterialUrl: string = `${environment.apiUrl}/Observationsitems`



    allobservation(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.rawmaterialUrl}` + "/findAll",data);
    }
    findNotificationAll() {
        return this.getCallService(`${this.rawmaterialUrl}` + "/findNotificationAll");
    }
    
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.rawmaterialUrl}`, data);
    }

    observationsave(observationsitems001wb : Observationsitems001wb[]=[] ) {
        console.log("observationsitems001wb=======",observationsitems001wb);
        
    return this.postCallService(`${this.rawmaterialUrl}` + "/save", {}, observationsitems001wb );
    }
  
    observationUpdate(observationsitems001wb: Observationsitems001wb) {
        return this.putCallService(`${this.rawmaterialUrl}` + "/update", {}, observationsitems001wb);
    }
  

    observationDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.rawmaterialUrl}` + "/delete", data);
    }

}