# HID Headset Test

## Prerequisites

- Node.js v12 or higher should be installed on your machine
- [node-gyp](https://github.com/nodejs/node-gyp#installation)'s prerequisites need to be installed

## How to use?

```sh
# install dependencies
$ npm install

# compile typescript files
$ npm run compile

# watch typescript files for changes (auto compilation)
$ npm run watch

# run the app
$ npm start

# create distributable packages for specific platforms
$ npm run dist-linux
$ npm run dist-mac
$ npm run dist-windows
```

## Troubleshooting

If you get "Module did not register" or "Compiled against a different Node.js version" errors after starting the app, this means a native module dependency was not built correctly. Let electron-builder rebuild it for you by running a `npm run dist-${platform}` command.

## Directory Structure

<pre>
.
├── electron-builder.json <b>(electron-builder configuration)</b>
├── .gitignore
├── LICENSE.md
├── package.json
├── package-lock.json
├── README.md
├── src <b>(typescript files go here)</b>
│   ├── main.ts
│   ├── preload.ts
│   └── renderer.ts
├── tsconfig.json <b>(typescript compiler options)</b>
├── tslint.json <b>(tslint configuration)</b>
└── views <b>(html, css files go here)</b>
    └── index.html
</pre>

## Resources

- [Electron docs](https://www.electronjs.org/docs)
- [electron-builder docs](https://www.electron.build)
- [Typescript docs](https://www.typescriptlang.org/docs)
- [Tslint docs](https://palantir.github.io/tslint/usage/configuration)
