export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

export interface EmailService {
  send(input: SendEmailInput): Promise<void>;
}

export class EmailServiceNotConfigured implements EmailService {
  async send(): Promise<void> {
    throw new Error("Email service is not configured.");
  }
}
