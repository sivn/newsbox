
# Newsbox
Newsreader for RSS Feeds.
**_Team 04: Kevin Biehl, Vincent Simon_**

## Features

- Eingabe von RSS-Feeds
- Auflistung der Nachrichten
- Automatisches sortieren der Nachrichten
- Favoriten System

## Tech

Newsbox uses a number of open source projects to work properly:
- [React Native]
- [React]
- [FontAwesome]
- [React Native RSS Parser]
- [React Native Paper]

## Installation

Newsbox requires [Node.js](https://nodejs.org/) Version 16.15+ to run. For the runtime to be available you need to install all its dependencies 
[React-Native Setup](https://reactnative.dev/docs/environment-setup). The projects react version is 17.0.2.

### Clone Git Repository:
```sh
git clone git@github.com:sivn/newsbox.git
cd newsbox
```

### Install the dependencies:
```sh
npm install
npx react-native run-android
npx react-native start
```
Sometimes a reload of the emulator is required (double tap R-Button)

### Compiling the .apk
```sh
cd ./newsbox/android/app
ngx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
cd ./android
./gradlew assembleRelease
```
The finished .apk-File can be located in the /android/app/build/outputs/apk/release-Directory.

   [React]: <https://reactjs.org/>
   [React Native]: <https://reactnative.dev>
   [FontAwesome]: <https://fontawesome.com/>
   [React Native RSS Parser]: <https://github.com/jameslawler/react-native-rss-parser>
   [React Native Paper]: <https://callstack.github.io/react-native-paper>
