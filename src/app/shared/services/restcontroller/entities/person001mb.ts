import { BaseEntity } from "./BaseEntity";

export class Person001mb extends BaseEntity {
    personId?: number;
    firstname?: string;
    lastname?: string;
    age?: number;
    dob?: Date;
    sex?: string;
    maritalstatus?: string;
    bloodgroup?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    religion?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: number;
    mobileno?: number;
    workphoneno?: number;
    homephoneno?: number;
    primaryemail?: string;
    secondaryemail?: string;
    occupationtype?: string;
    occupationrole?: string;
}