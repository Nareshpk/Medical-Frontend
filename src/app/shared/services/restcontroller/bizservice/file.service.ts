import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { File001mb } from "../entities/file001mb";

@Injectable()
export class FileDocumetManager extends BaseService {
    private fileUrl: string = `${environment.apiUrl}/files`

    allfile() {
        return this.getCallService(`${this.fileUrl}` + "/findAll");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.fileUrl}`, data);
    }

    fileSave(file001mb: File001mb) {
        return this.postCallService(`${this.fileUrl}` + "/save", {}, file001mb);
    }

    fileUpdate(file001mb: File001mb) {
        return this.putCallService(`${this.fileUrl}` + "/update", {}, file001mb);
    }
    
    fileDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fileUrl}`+"/delete", data);
    }
}