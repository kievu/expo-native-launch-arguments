# expo-native-launch-arguments

> **Note:** This repository is a fork of [react-native-launch-arguments](https://github.com/iamolegga/react-native-launch-arguments) by [@iamolegga](https://github.com/iamolegga). I'm awaiting permission to push a branch and open a PR to the original repository. In the meantime, I created this separate repo to provide **New Architecture** and **Expo managed workflow** support. This repository can be deleted if the admin of the original repo requests it.

Expo module to get launch arguments.

Makes passing parameters from testing libraries and debug tools to React Native super easy.

Built with [Expo Modules API](https://docs.expo.dev/modules/overview/) using Swift and Kotlin.

## Install

```sh
npm install expo-native-launch-arguments
npx expo prebuild
```

Or with yarn:

```sh
yarn add expo-native-launch-arguments
npx expo prebuild
```

## Requirements

- Expo SDK 54+
- React Native 0.76+
- iOS 15.1+

## Usage

### JavaScript

```js
import { LaunchArguments } from "expo-native-launch-arguments";

const args = LaunchArguments.value();
console.log(args); // { myKey: "myValue", myFlag: true }
```

### TypeScript

```ts
import { LaunchArguments } from "expo-native-launch-arguments";

interface MyExpectedArgs {
  authToken?: string;
  skipAuth?: boolean;
}

const args = LaunchArguments.value<MyExpectedArgs>();
```

## Integrating with End-to-end Testing Tools

The primary use case is with end-to-end testing tools like Detox.

### [Detox](https://github.com/wix/Detox/)

```js
await device.launchApp({
  launchArgs: {
    authToken: "test-token-123",
    skipOnboarding: true,
  },
});
```

- See [`device.launchApp({launchArgs:{...}})`](https://wix.github.io/Detox/docs/api/device/#7-launchargsadditional-process-launch-arguments)
- See [launch arguments guide](https://wix.github.io/Detox/docs/guide/launch-args) for full details.

### [Appium](http://appium.io/)

```js
capabilities: {
  optionalIntentArguments: `--ez myBool true --es myStr 'string text'`, // Android
  processArguments: { args: ['-myBool', 'true', '-myStr', 'string text'] }, // iOS
}
```

- [`optionalIntentArguments (Android)` and `processArguments (iOS)`](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)

### [Maestro](https://maestro.mobile.dev/)

```yaml
- launchApp:
    appId: "com.example.app"
    arguments:
      foo: "This is a string"
      isFooEnabled: false
      fooValue: 3.24
```

- [`arguments parameter of launchApp command`](https://maestro.mobile.dev/api-reference/commands/launchapp#launch-arguments)

### Xcode

In Xcode, add launch arguments in the Scheme editor:

- Product → Scheme → Edit Scheme... → Run → Arguments tab → Arguments Passed On Launch
- Prefix each argument with `-`

```
-hello "world"
```

This results in `{ "hello": "world" }`.

## Platform-specific Notes

### iOS

Reads arguments from `ProcessInfo.processInfo.arguments`.

#### Verifying on iPhone Simulator

```bash
xcrun simctl launch booted com.MyAppBundleId -myKey "myValue"
```

### Android

Reads from:

- `intent.getBundleExtra("launchArgs")` for Detox
- `intent.getExtras()` for ADB params

#### Passing args via ADB

```bash
adb shell am start -n com.example/.MainActivity --es myKey "myValue" --ez myBool true
```

## Development

### Building the library

```bash
npm run build
```

### Running the example app

```bash
cd example
npm install
npx expo prebuild
npm run ios
```

### Running Detox tests

```bash
cd example
npm run detox:ios
```

## License

MIT
