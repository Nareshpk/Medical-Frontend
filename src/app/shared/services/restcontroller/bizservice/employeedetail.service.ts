import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Emp001mb } from "../entities/employeedetails.mb";


@Injectable()
export class EmployeeDetailsManager extends BaseService {
    private EmployeeUrl: string = `${environment.apiUrl}/empdetails`


    allemployee(unitslno: any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.EmployeeUrl}` + "/findAll", data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.EmployeeUrl}`, data);
    }
    findAllSlNoAndEcode() {
        return this.getCallService(`${this.EmployeeUrl}` + "/findAllSlNoAndEcode");
    }

    // employeeSave(emp001mb: Emp001mb) {

    //     return this.postCallService(`${this.EmployeeUrl}` + "/save", {}, emp001mb);
    // }

    // employeeUpdate(emp001mb: Emp001mb) {
    //     return this.putCallService(`${this.EmployeeUrl}` + "/update", {}, emp001mb);
    // }
    employeeSave(emp001mb: Emp001mb, selectedFile: any) {
        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("filename", selectedFile.name);

        // formData.append("slNo", breakdownreg001wb.slNo);
        formData.append("empcode", emp001mb.empcode);
        formData.append("empname", emp001mb.empname);
        formData.append("des", emp001mb.des);
        formData.append("age", emp001mb.age);
        formData.append("doj", emp001mb.doj);
        formData.append("dob", emp001mb.dob);
        formData.append("fname", emp001mb.fname);
        formData.append("bgroup", emp001mb.bgroup);
        formData.append("female", emp001mb.female);

        formData.append("married", emp001mb.married);
        formData.append("child", emp001mb.child);
        formData.append("dep", emp001mb.dep);
        formData.append("add1", emp001mb.add1);
        formData.append("add2", emp001mb.add2);
        formData.append("edu", emp001mb.edu);
        formData.append("exp", emp001mb.exp);
        formData.append("det", emp001mb.det);
        formData.append("filepath", emp001mb.filepath);
        formData.append("insertUser", emp001mb.insertUser);
        formData.append("insertDatetime", new Date());
        return this.postCallService(`${this.EmployeeUrl}` + "/save", {}, formData).pipe(
            catchError(this.errorMgmt)
        )
    }

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    employeeUpdate(emp001mb: Emp001mb, selectedFile: any) {
        let formData: any = new FormData();

        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("filename", selectedFile.name);
        formData.append("slNo", emp001mb.slNo);
        formData.append("empcode", emp001mb.empcode);
        formData.append("empname", emp001mb.empname);
        formData.append("des", emp001mb.des);
        formData.append("age", emp001mb.age);
        formData.append("doj", emp001mb.doj);
        formData.append("dob", emp001mb.dob);
        formData.append("fname", emp001mb.fname);
        formData.append("bgroup", emp001mb.bgroup);
        formData.append("female", emp001mb.female);

        formData.append("married", emp001mb.married);
        formData.append("child", emp001mb.child);
        formData.append("dep", emp001mb.dep);
        formData.append("add1", emp001mb.add1);
        formData.append("add2", emp001mb.add2);
        formData.append("edu", emp001mb.edu);
        formData.append("exp", emp001mb.exp);
        formData.append("det", emp001mb.det);
        formData.append("filepath", emp001mb.filepath);
        formData.append("insertUser", emp001mb.insertUser);
        formData.append("insertDatetime", new Date());
        return this.putCallService(`${this.EmployeeUrl}` + "/update", {}, formData).pipe(
            catchError(this.errorMgmt)
        );
    }


    employeeDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.EmployeeUrl}` + "/delete", data);
    }

    empdetPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.EmployeeUrl}` + "/pdf",data)
    }
    empdetExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.EmployeeUrl}` + "/excel",data)
    }

}