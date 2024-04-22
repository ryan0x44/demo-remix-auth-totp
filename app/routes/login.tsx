import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/auth.server";
import { getSession, commitSession } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/account",
  });
  const session = await getSession(request.headers.get("Cookie"));
  const authError = session.get(authenticator.sessionErrorKey);

  // Commit session to clear any `flash` error message.
  return json(
    { authError },
    {
      headers: {
        "set-cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate("TOTP", request, {
    // The `successRedirect` route will be used to verify the OTP code.
    // This could be the current pathname or any other route that renders the verification form.
    successRedirect: "/verify",

    // The `failureRedirect` route will be used to render any possible error.
    // If not provided, ErrorBoundary will be rendered instead.
    failureRedirect: "/login",
  });
}

export default function Login() {
  const { authError } = useLoaderData<typeof loader>();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Login Form. */}
      <Form method="POST">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Insert email .."
          required
        />
        <button type="submit">Send Code</button>
      </Form>

      {/* Login Errors Handling. */}
      <span>{authError?.message}</span>
    </div>
  );
}
