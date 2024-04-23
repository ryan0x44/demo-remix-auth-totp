import type { ActionFunctionArgs, LoaderFunction } from "@remix-run/cloudflare";
import { Form, json, useActionData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return {};
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const payload = formData.get("payload")?.toString() || "";
  return json({ payload });
}

export default function Demo() {
  const data = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Form method="post">
        <textarea name="payload">{data ? data.payload : ""}</textarea>
        <br />
        <input type="submit" />
      </Form>
      <hr />
      {JSON.stringify(data)}
    </div>
  );
}
