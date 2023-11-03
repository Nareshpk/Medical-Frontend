import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixtureSpares001mb } from "../entities/FixtureSparemb";
import { Spares001mb } from "../entities/spares001mb";

@Injectable()
export class FixtureSparesettingManager extends BaseService {
   
    private fixturesparesettingUrl: string = `${environment.apiUrl}/fixspare`
    allfixturesparesetting(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixturesparesettingUrl}`+"/findAll",data);
    }
    fixturesparesave(fixturespares001mb: FixtureSpares001mb) {
        return this.postCallService(`${this.fixturesparesettingUrl}` + "/save", {}, fixturespares001mb);
    }
    fixturespareupdate(fixturespares001mb: FixtureSpares001mb) {
        return this.putCallService(`${this.fixturesparesettingUrl}` + "/update", {}, fixturespares001mb);
    }
    sparedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fixturesparesettingUrl}`+"/delete",data);
    }
    sparePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturesparesettingUrl}` + "/pdf",data)
    }
    spareExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturesparesettingUrl}` + "/excel",data)
    }
}