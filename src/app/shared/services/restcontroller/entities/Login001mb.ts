import { BaseEntity } from "./BaseEntity";
import { User001mb } from "./User001mb";

export class Login001mb extends User001mb {
    loginid?: number;
    unitslno?: number;
    firstname?: string;
    lastname?: string;
    domain?: string;
    username?: string;
    password?: string;
    enabled?: number;
    securityquestion?: string;
    securityanswer?: string;
    message?: string | null;
    status?: string;
    theme?: string | null;
}
