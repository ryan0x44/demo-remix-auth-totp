export type SendEmailBody = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(body: SendEmailBody) {
  console.log(
    "what needs to be sent to the email provider: " + JSON.stringify(body)
  );
}
