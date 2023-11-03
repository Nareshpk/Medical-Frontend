import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class SystemPropertiesService extends BaseService {

  private systemPropertiesUrl: string = `${environment.apiUrl}/systemproperties`

  system(Nname: string, Ttype: string) {
    var params: any = {};
    params['name'] = Nname;
    params['type'] = Ttype;
    return this.getCallService(`${this.systemPropertiesUrl}` + '/getSystemPropertiesByNameAndType', params);
  }

  registerSystem(Nname: string, Ttype: string) {
    var params: any = {};
    params['name'] = Nname;
    params['type'] = Ttype;
    // return this.getCallService(`${this.systemPropertiesUrl}` + '/getSystemPropertiesByNameAndTypeReg', params);
  }
}
