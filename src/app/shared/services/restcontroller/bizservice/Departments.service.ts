import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Departments001mb } from "../entities/Departments001mb";

@Injectable()
export class DepartmentsManager extends BaseService {
    private departmentUrl: string = `${environment.apiUrl}/department`
    alldepartment() {
        return this.getCallService(`${this.departmentUrl}` + "/findAll");
    }

    loginDeptFindAll() {
        return this.getCallService(`${this.departmentUrl}` + "/loginDeptFindAll");
    }

    departmentsave(departments001mb: Departments001mb) {

        return this.postCallService(`${this.departmentUrl}` + "/save", {}, departments001mb);
    }
    departmentupdate(departments001mb: Departments001mb) {
        return this.putCallService(`${this.departmentUrl}` + "/update", {}, departments001mb);
    }

    departmentdelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.departmentUrl}` + "/delete", data);
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.departmentUrl}`, data);
    }

    departmentPdf() {
        return this.getCallService1(`${this.departmentUrl}` + "/pdf")
    }
    departmentExcel() {
        return this.getCallService1(`${this.departmentUrl}` + "/excel")
    }
}