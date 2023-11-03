import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { UnitMaster001mb } from "../entities/unitmaster001mb";

@Injectable()

export class UnitManagerManager extends BaseService {

  private UnitMasterUrl: string = `${environment.apiUrl}/unitmaster`

  allunitmanager() {
    return this.getCallService(`${this.UnitMasterUrl}` + "/findAll");
  }

  saveunitmanager(unitMaster001mb: UnitMaster001mb) {
    console.log("unitMaster001mb--service", unitMaster001mb);
    return this.postCallService(`${this.UnitMasterUrl}` + "/save", {}, unitMaster001mb);
  }

  updateunitmanager(unitMaster001mb: UnitMaster001mb) {
    return this.putCallService(`${this.UnitMasterUrl}` + "/update", {}, unitMaster001mb);
  }

  deleteunitmanager(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.UnitMasterUrl}` + "/delete", data);
  }
}