import { BaseEntity } from "./BaseEntity";

export class Doctor001mb extends BaseEntity {
  slNo: number;
  unitslno: number;
  dFirstName: string;
  dLastName: string;
  specialist: string;
  dateOfBirth: Date;
  email: string;
  contact: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
}
