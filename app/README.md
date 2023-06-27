# keychain/app

## Developing

```bash
yarn run start
```

## Dependencies Management

- `package.json:dependencies` that are required for the app to run and paramount to the app's ability to function. They
  are usually used in production, installed on the client or required to compile the app from the source.
- `package.json:devDependencies` that are required for the app to build and function but not necessary part of the app
  such as testing, linting, etc.

While the dichotomy between the two is not always clear since the line between the two is blurry, we ought to keep the
`dependencies` as small as possible to reduce the attack surface for security of the app.
