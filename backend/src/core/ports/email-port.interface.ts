export interface EmailOptions {
  from: string;
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  template?: string;
  templateId?: number;
  context?: any;
}

export abstract class EmailAdapterPort {
  abstract sendMail(mailOptions: EmailOptions): Promise<any>;
}
