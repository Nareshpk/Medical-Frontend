import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Materialreqslip001wb } from "../entities/material-req-slip001wb";


@Injectable()
export class MaterialRequisitionManager extends BaseService {

    private MaterialReqUrl: string = `${environment.apiUrl}/materialreq`

    allmaterialreq(unitslno:number) {
        let data: any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.MaterialReqUrl}` + "/findAll",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.MaterialReqUrl}`, data);
    }

    materialreqSave(materialreq001wb: Materialreqslip001wb) {
        return this.postCallService(`${this.MaterialReqUrl}` + "/save", {}, materialreq001wb);
    }

    materialreqUpdate(materialreq001wb: Materialreqslip001wb) {
        return this.putCallService(`${this.MaterialReqUrl}` + "/update", {}, materialreq001wb);
    }

    materialreqDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.MaterialReqUrl}` + "/delete", data);
    }


    
    materialreqslipPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.MaterialReqUrl}` + "/pdf", data)
    }
    materialreqslipExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.MaterialReqUrl}` + "/excel", data)
    }

}