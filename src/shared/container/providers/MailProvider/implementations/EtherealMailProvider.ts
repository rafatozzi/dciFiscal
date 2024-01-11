import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import handlebars from "handlebars";
import fs from "fs";

import { IMailProvider } from "../IMailProvider";

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  }

  /*
  constructor() {
    this.client = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "datacontrolcontabil@gmail.com",
        pass: "dci@1365"
      }
    })
  }
  */

  async sendMail(to: string, subject: string, variables: any, path: string, attachments?: Mail.Attachment[]): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "No-Reply DCI Suporte <noreply@dcisuporte.com.br>",
      subject,
      html: templateHTML,
      attachments
    });
  }

}