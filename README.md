# Demo of remix-auth-totp

This repository attempts to demonstrate the implementation of

* remix.run using cloudflare starter and vite
* remix-auth
* remix-auth-totp

See the [remix-auth-totp documentation](https://github.com/dev-xo/remix-auth-totp/tree/main/docs#remix-auth-totp-documentation) for more info.

# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
bun run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Development

Run the Vite dev server:

```sh
bun run dev
```

To run Wrangler:

```sh
bun run build
bun run start
```

## Deployment

> [!WARNING]  
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
bun run build
```

Then, deploy your app to Cloudflare Pages:

```sh
bun run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/
