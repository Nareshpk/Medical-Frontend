import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Unitdepartmaster001mb } from "../entities/Unitdepartmaster001mb";

@Injectable()

export class UnitDepartManager extends BaseService {

  private UnitDeptMasterUrl: string = `${environment.apiUrl}/unitdepartment`

  allunitdepartmanager() {
    return this.getCallService(`${this.UnitDeptMasterUrl}` + "/findAll");
  }

  saveunitdepartmanager(unitdepartmaster001mb: Unitdepartmaster001mb) {
    console.log("unitdepartmaster001mb",unitdepartmaster001mb);

    return this.postCallService(`${this.UnitDeptMasterUrl}` + "/save", {}, unitdepartmaster001mb);
  }

  updateunitdepartmanager(unitdepartmaster001mb: Unitdepartmaster001mb) {
    return this.putCallService(`${this.UnitDeptMasterUrl}` + "/update", {}, unitdepartmaster001mb);
  }

  deleteunitdepartmanager(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.UnitDeptMasterUrl}` + "/delete", data);
  }
}
