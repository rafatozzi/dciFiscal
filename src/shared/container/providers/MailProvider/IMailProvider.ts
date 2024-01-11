import Mail from "nodemailer/lib/mailer";

export interface IMailProvider {
  sendMail(to: string, subject: string, variables: any, path: string, attachments?: Mail.Attachment[]): Promise<void>;
}