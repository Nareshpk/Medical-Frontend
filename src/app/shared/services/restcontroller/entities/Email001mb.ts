import { BaseEntity } from "./BaseEntity";

export class Email001mb extends BaseEntity  {
    emailId?: number;
    unitslno?: number;
    emailFrom?: string;
    emailTo?: string;
    emailCc?: string;
    emailBcc?: string;
    emailDate?: string | null;
    emailSubject?: string | null;
    emailBody?: string | null;
    emailCurrentPlace?: string | null;
    isEmailViewed?: string | null;
    isEmailAttachmentExists?: string | null;
    multipleEmailId?: string | null;
}