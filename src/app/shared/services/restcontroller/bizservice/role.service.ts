import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Role001mb } from "../entities/Role001mb";

@Injectable()

export class RoleManager extends BaseService {

  private roleUrl: string = `${environment.apiUrl}/role`

  allrole() {
    return this.getCallService(`${this.roleUrl}` + "/findAll");
  }

  saverole(roles: Role001mb) {
    return this.postCallService(`${this.roleUrl}` + "/save", {}, roles);
  }

  updaterole(roles: Role001mb) {
    return this.putCallService(`${this.roleUrl}` + "/update", {}, roles);
  }

  deleterole(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.roleUrl}` + "/delete", data);
  }
}