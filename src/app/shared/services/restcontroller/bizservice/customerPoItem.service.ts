import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";

@Injectable()
export class CustomerPoitemManager extends BaseService {
    private CustomerPoitemUrl: string = `${environment.apiUrl}/CustomerPoitem`

    allCustomerPoitem(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.CustomerPoitemUrl}` + "/findAll",data);
    }

}