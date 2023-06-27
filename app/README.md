# keychain/app

## Developing

You need to separate terminal windows for each of the following commands:

```bash
yarn run watch
```

```bash
yarn run start
```

The first command will `watch` for changes in the `./app` directory and rebuild the app on the fly.
This is powered by turborepo, see `turbo.json`.

The second command will `start` the expo dev server, this command is powered by expo.

> We separate the two commands because expo does not support extensions that allow watching for changes in the `./app`
> directory. We couldn't use turborepo to chain the two commands because expo requires stdin to be a TTY.
> Instead of hacking around this with a custom script, we decided to keep the two commands separate.

## Dependencies Management

- `package.json:dependencies` that are required for the app to run and paramount to the app's ability to function. They
  are usually used in production, installed on the client or required to compile the app from the source.
- `package.json:devDependencies` that are required for the app to build and function but not necessary part of the app
  such as testing, linting, etc.

While the dichotomy between the two is not always clear since the line between the two is blurry, we ought to keep the
`dependencies` as small as possible to reduce the attack surface for security of the app.
