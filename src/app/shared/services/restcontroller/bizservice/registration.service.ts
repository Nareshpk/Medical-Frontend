// import { Injectable } from "@angular/core";
// import { environment } from "src/environments/environment";
// import { BaseService } from "../../services/base.service";
// import { Registration001mb } from "../entities/Registration001mb";

// @Injectable()

// export class RegistrationManager extends BaseService {

//     private registrationUrl: string = `${environment.apiUrl}/person`

//     allregister() {
//         return this.getCallService(`${this.registrationUrl}` + "/findAll");
//     }

//     saveregister(registration001mb: Registration001mb) {
//         return this.postCallService(`${this.registrationUrl}` + "/save", {}, registration001mb);
//     }

//     updateregister(registration001mb: Registration001mb) {
//         return this.putCallService(`${this.registrationUrl}` + "/update", {}, registration001mb);
//     }

//     saveuserregister(registration001mb: Registration001mb) {
//         return this.postCallService(`${this.registrationUrl}` + "/userregistration", {}, registration001mb);
//     }

//     deleteregister(id: any) {
//         let data: any = {};
//         data['id'] = id;
//         return this.deleteCallService(`${this.registrationUrl}` + "/delete", data);
//     }
// }