import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Trainingplan001mb } from "../entities/trainingplan001mb";



@Injectable()
export class TrainingPlanManager extends BaseService {

    private TrainingPlanUrl: string = `${environment.apiUrl}/trainingplan`

    alltrainingPlan(unitslno:number) {
        let data: any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.TrainingPlanUrl}` + "/findAll",data);
    }

    trainingPlansave(trainingplan001mb: Trainingplan001mb) {
        return this.postCallService(`${this.TrainingPlanUrl}` + "/save", {}, trainingplan001mb);
    }

    trainingPlanupdate(trainingplan001mb: Trainingplan001mb) {
        return this.putCallService(`${this.TrainingPlanUrl}` + "/update", {}, trainingplan001mb);
    }

    trainingPlandelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.TrainingPlanUrl}` + "/delete", data);
    }



    suptrnplanPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.TrainingPlanUrl}` + "/pdf",data)
    }
    suptrnplanExcel(unitslno:number) { 
        let data: any = {};
        data['unitslno'] = unitslno;   
        return this.getCallService1(`${this.TrainingPlanUrl}` + "/excel",data)
    }

}