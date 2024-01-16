import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Customer001mb } from "../entities/Customer001mb";







@Injectable()
export class CustomerManager extends BaseService {

    private CustomerUrl: string = `${environment.apiUrl}/Customer`

    allcustomer(unitslno:any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.CustomerUrl}` + "/findAll", data);
    }

    saveCustomer(customer001mb: Customer001mb) {

        return this.postCallService(`${this.CustomerUrl}` + "/save", {}, customer001mb);
    }

    updateCustomer(customer001mb: Customer001mb) {
        return this.putCallService(`${this.CustomerUrl}` + "/update", {}, customer001mb);
    }

    deleteCustomer(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.CustomerUrl}` + "/delete", data);
    }

    customerPdf(unitslno: number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.CustomerUrl}` + "/pdf", data)
    }
    customerExcel(unitslno: number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.CustomerUrl}` + "/excel", data)
    }

}