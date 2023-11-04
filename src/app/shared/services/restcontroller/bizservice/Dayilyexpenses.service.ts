import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Dayilyexpenses001mb } from "../entities/Dayilyexpenses001mb";


@Injectable()
export class DayilyexpensesManager extends BaseService {
  private dayilyexpensestUrl: string = `${environment.apiUrl}/Dayilyexpenses`
  allDayilyexpenses(unitslno:any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.dayilyexpensestUrl}` + "/findAll",data);
  }

  dayilyexpensessave(dayilyexpenses001mb: Dayilyexpenses001mb) {

    return this.postCallService(`${this.dayilyexpensestUrl}` + "/save", {}, dayilyexpenses001mb);
  }
  dayilyexpensesupdate(dayilyexpenses001mb: Dayilyexpenses001mb) {
    return this.putCallService(`${this.dayilyexpensestUrl}` + "/update", {}, dayilyexpenses001mb);
  }

  dayilyexpensesdelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.dayilyexpensestUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.dayilyexpensestUrl}`, data);
  }

}
