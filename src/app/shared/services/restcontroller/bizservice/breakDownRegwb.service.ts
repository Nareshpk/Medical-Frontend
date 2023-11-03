import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Breakdownreg001wb } from "../entities/Breakdownreg001wb";


@Injectable()
export class BreakDownRegManager extends BaseService {
    private breakdownRegUrl: string = `${environment.apiUrl}/breakdownreg`

    allBreakdownreg() {
        return this.getCallService(`${this.breakdownRegUrl}` + "/findAll");
    }

    findAllByMachineId(mslNo: any, unitslno:any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.breakdownRegUrl}` + "/findAllByMachineId", data);
    }
    findAllByDashboard() {
        return this.getCallService(`${this.breakdownRegUrl}` + "/findAllByDashboard");
    }



    breakwnregSave(breakdownreg001wb: Breakdownreg001wb, selectedFile: any) {
        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("filename", selectedFile.name);
        // formData.append("slNo", breakdownreg001wb.slNo);
        formData.append("mslno", breakdownreg001wb.mslno);
        formData.append("date", breakdownreg001wb.date);
        formData.append("bdsl", breakdownreg001wb.bdsl);
        formData.append("rcsl", breakdownreg001wb.rcsl);
        formData.append("pasl", breakdownreg001wb.pasl);
        formData.append("startTime", breakdownreg001wb.startTime);
        formData.append("filepath", breakdownreg001wb.filepath);
        formData.append("endTime", breakdownreg001wb.endTime);
        formData.append("sslno", breakdownreg001wb.sslno);
        
        formData.append("spareCost", breakdownreg001wb.spareCost);
        formData.append("sparesQty", breakdownreg001wb.sparesQty);
        formData.append("attendby", breakdownreg001wb.attendby);
        formData.append("remarks", breakdownreg001wb.remarks);
        formData.append("unitslno", breakdownreg001wb.unitslno);
        formData.append("insertUser", breakdownreg001wb.insertUser);
        formData.append("insertDatetime", new Date());
        return this.postCallService(`${this.breakdownRegUrl}` + "/save", {}, formData).pipe(
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

    breakdownregUpdate(breakdownreg001wb: Breakdownreg001wb, selectedFile: any) {
        let formData: any = new FormData();
        formData.append("file", selectedFile);
        formData.append("contenttype", "contenttype");
        formData.append("filename", breakdownreg001wb.filename);


        formData.append("slNo", breakdownreg001wb.slNo);
        formData.append("mslno", breakdownreg001wb.mslno);
        formData.append("date", breakdownreg001wb.date);
        formData.append("bdsl", breakdownreg001wb.bdsl);
        formData.append("rcsl", breakdownreg001wb.rcsl);
        formData.append("pasl", breakdownreg001wb.pasl);
        formData.append("startTime", breakdownreg001wb.startTime);
        formData.append("filepath", breakdownreg001wb.filepath);
        formData.append("endTime", breakdownreg001wb.endTime);
        formData.append("sslno", breakdownreg001wb.sslno);
        formData.append("spareCost", breakdownreg001wb.spareCost);
        formData.append("sparesQty", breakdownreg001wb.sparesQty);
        formData.append("attendby", breakdownreg001wb.attendby);
        formData.append("remarks", breakdownreg001wb.remarks);
        formData.append("unitslno", breakdownreg001wb.unitslno);
        formData.append("insertUser", breakdownreg001wb.insertUser);
        formData.append("insertDatetime", new Date());
        formData.append("updatedUser", breakdownreg001wb.updatedUser);
        formData.append("updatedDatetime", new Date());
        return this.putCallService(`${this.breakdownRegUrl}` + "/update", {}, formData).pipe(
            catchError(this.errorMgmt)
        );
    }

    breakdownregDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.breakdownRegUrl}` + "/delete", data);
    }

    breakDownPdf(mslNo: any, unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.breakdownRegUrl}` + "/pdf", data)
    }

    breakDownExcel(mslNo: any, unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.breakdownRegUrl}` + "/excel", data)
    }
}