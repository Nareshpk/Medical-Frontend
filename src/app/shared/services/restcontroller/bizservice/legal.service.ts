import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Emp001mb } from "../entities/employeedetails.mb";
import { Legal001wb } from "../entities/legal.mb";
import { Legal001mb } from "../entities/legaldocuments.mb";


@Injectable()
export class LegalManager extends BaseService {
    private LegalwfUrl: string = `${environment.apiUrl}/legal`


    alllegal(unitslno:number) {
        let data: any={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.LegalwfUrl}` + "/findAll",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.LegalwfUrl}`, data);
    }
  
    legSave(legal001wb: Legal001wb, selectedFile: any ) {
        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("filename", selectedFile.name);

        formData.append("cslno", legal001wb.cslno);
        formData.append("fslno", legal001wb.fslno);
        formData.append("cno", legal001wb.cno);
        formData.append("date", legal001wb.date);
        formData.append("date1", legal001wb.date1);
        formData.append("filepath", legal001wb.filepath);
        formData.append("unitslno", legal001wb.unitslno);
        formData.append("insertUser", legal001wb.insertUser);
        formData.append("insertDatetime", new Date());
        formData.append("updatedUser", legal001wb.updatedUser);
        formData.append("updatedDatetime", new Date());
        return this.postCallService(`${this.LegalwfUrl}` + "/save", {}, formData).pipe(
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
    
    findNotificationAll() {
        // let data: any={};
        // data['unitslno'] = unitslno;
        return this.getCallService(`${this.LegalwfUrl}` + "/findNotificationAll");
    }
    findAllBylegalId(cslNo: any) {
        let cslno: any = {};
        cslno['cslno'] = cslNo;
        return this.getCallService(`${this.LegalwfUrl}` + "/findAllBylegalId", cslno);
    }

    legUpdate(legal001wb: Legal001wb, selectedFile: any) {
        let formData: any = new FormData();

        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("filename", selectedFile.name);
        formData.append("slNo", legal001wb.slNo);
        formData.append("cslno", legal001wb.cslno);
        formData.append("fslno", legal001wb.fslno);
        formData.append("cno", legal001wb.cno);
        formData.append("date", legal001wb.date);
        formData.append("date1", legal001wb.date1);
        formData.append("filepath", legal001wb.filepath);
         formData.append("unitslno", legal001wb.unitslno);
        formData.append("insertUser", legal001wb.insertUser);
        formData.append("insertDatetime", new Date());
        formData.append("updatedUser", legal001wb.updatedUser);
        formData.append("updatedDatetime", new Date());
        console.log("formData", formData);  
        return this.putCallService(`${this.LegalwfUrl}` + "/update", {}, formData).pipe(
            catchError(this.errorMgmt)
        );
    }
    
    legDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.LegalwfUrl}` + "/delete", data);
    }

   


    legdetPdf(unitslno:number) {  
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.LegalwfUrl}` + "/pdf",data)
    }
    legdetExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.LegalwfUrl}` + "/excel",data)
    }

}