import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Departments001mb } from "../entities/Departments001mb";
import { Doctor001mb } from "../entities/Doctor001mb";

@Injectable()
export class DoctorManager extends BaseService {
  private doctortUrl: string = `${environment.apiUrl}/doctor`
  alldoctor(unitslno:any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.doctortUrl}` + "/findAll",data);
  }


  doctorsave(doctor001mb: Doctor001mb) {

    return this.postCallService(`${this.doctortUrl}` + "/save", {}, doctor001mb);
  }
  doctorupdate(doctor001mb: Doctor001mb) {
    return this.putCallService(`${this.doctortUrl}` + "/update", {}, doctor001mb);
  }

  doctordelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.doctortUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.doctortUrl}`, data);
  }

}
