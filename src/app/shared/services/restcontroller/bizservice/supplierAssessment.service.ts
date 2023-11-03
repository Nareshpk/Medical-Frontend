import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierassessment001wb } from "../entities/Supplierassessment001wb";

@Injectable()
export class SupplierAssessmentManager extends BaseService {
    private SupplierAssessmentUrl: string = `${environment.apiUrl}/assessment`

    allassessment() {
        return this.getCallService(`${this.SupplierAssessmentUrl}` + "/findAll");
    }

    findAllBySupplierId(suppSlNo: any,unitslno:number) {
        let data: any = {};
        data['suppSlno'] = suppSlNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SupplierAssessmentUrl}` + "/findAllBySupplierId", data);
    }

    assessmentsave(supplierassessment001wb: Supplierassessment001wb) {
        return this.postCallService(`${this.SupplierAssessmentUrl}` + "/save", {}, supplierassessment001wb);
    }

    assessmentupdate(supplierassessment001wb: Supplierassessment001wb) {
        return this.putCallService(`${this.SupplierAssessmentUrl}` + "/update", {}, supplierassessment001wb);
    }

    assessmentdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SupplierAssessmentUrl}` + "/delete", data);
    }

    assessmentPdf(suppSlNo: any) {
        let suppSlno: any = {};
        suppSlno['suppSlno'] = suppSlNo;
        return this.getCallService1(`${this.SupplierAssessmentUrl}` + "/pdf", suppSlno)
    }

    assessmentExcel(suppSlNo: any) {
        let suppSlno: any = {};
        suppSlno['suppSlno'] = suppSlNo;
        return this.getCallService1(`${this.SupplierAssessmentUrl}` + "/excel", suppSlno)
    }
}