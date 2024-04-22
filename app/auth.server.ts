import { Authenticator } from "remix-auth";
import { TOTPStrategy, TOTPVerifyParams } from "remix-auth-totp";
import { sessionStorage } from "./session.server";
import { sendEmail } from "./email.server";

type User = {
  id: string;
  email: string;
};

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new TOTPStrategy(
    {
      secret: "NOT_A_REAL_SECRET_FOR_AUTHENTICATOR",
      sendTOTP: async ({ email, code, magicLink }) => {
        // Send the TOTP code to the user.
        const html =
          "<html><body><p>Code: " +
          code +
          '</p><p>Link: <a href="' +
          magicLink +
          '">' +
          magicLink +
          "</body></html>";
        const text = "Code: " + code + "\nLink: " + magicLink + "\n";
        await sendEmail({ to: email, html, text, subject: "Login code" });
      },
    },
    async ({ email }: TOTPVerifyParams) => {
      console.log("verify function for email " + email);
      return { email: email } as User;
    }
  )
);
