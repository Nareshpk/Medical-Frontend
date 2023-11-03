import { BaseEntity } from "./BaseEntity";
import { Departments001mb } from "./Departments001mb";
import { UnitMaster001mb } from "./unitmaster001mb";

export class User001mb extends BaseEntity  {
    personId?: number;
    unitslno?: number;
    dpslno?: number;
    roleid?: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    status?: string;
    email?: string;
    securityquestion?: string;
    securityanswer?: string;
    theme?: string | null;
    dpslno2?: Departments001mb;
    unitslno2?: UnitMaster001mb;
}