import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_auth",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["NOT_A_REAL_SECRET"],
    secure: false,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
