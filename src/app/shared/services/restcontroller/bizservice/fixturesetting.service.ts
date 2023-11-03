import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Fixture001mb } from "../entities/Fixture001mb";
import { Machine001mb } from "../entities/Machine001mb";


@Injectable()
export class FixtureSettingManager extends BaseService {
    checklistPdf() {
        throw new Error('Method not implemented.');
    }
    private fixtureUrl: string = `${environment.apiUrl}/fixtures`

    allfixture(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixtureUrl}` + "/findAll",data);
    }
    getCount(){
        return this.getCallService(`${this.fixtureUrl}` + "/getCount");
       }
  
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.fixtureUrl}`, data);
    }

    findAllSlNoAndMcode(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixtureUrl}` + "/findAllSlNoAndMcode",data);
    }

    fixturesave(fixture001mb:Fixture001mb) {
        return this.postCallService(`${this.fixtureUrl}` + "/save", {}, fixture001mb);
    }

    fixtureupdate(fixture001mb: Fixture001mb) {
        return this.putCallService(`${this.fixtureUrl}` + "/update", {}, fixture001mb);
    }
    
    fixturedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fixtureUrl}`+"/delete", data);
    }
    fixturePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixtureUrl}` + "/pdf",data)
    }
    fixtureExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixtureUrl}` + "/excel",data)
    }
   
}