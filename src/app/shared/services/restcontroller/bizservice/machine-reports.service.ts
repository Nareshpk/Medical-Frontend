import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";


@Injectable()
export class MachineReportsManager extends BaseService {
    private machineReportsUrl: string = `${environment.apiUrl}/machineReports`

    machineReportsPdf(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.machineReportsUrl}` + "/pdf", mslNo)
    }

    machineReportsExcel(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.machineReportsUrl}` + "/excel", mslNo)
    }

}