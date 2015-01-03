pitch
=====

_Pitch is a mobile app that lets students split their daily expenses with other students at their university. Students can pitch large quantity purchases, and ask if anyone else is interested in pitching in to share the costs and items bought._

# Setup

Make sure install the Cordova and Ionic CLI:

```shell
$ npm install -g cordova
$ npm install -g ionic
```

Install the required project dependencies:

```shell
$ npm install
```

If you have to choose between AngularJS versions, use version `1.3.6`.

Run the app:

```shell
$ ionic serve
```

# Facebook for iOS:

Clone PhoneGap's Facebook Plugin:

```shell
$ git clone https://github.com/Wizcorp/phonegap-facebook-plugin.git plugins/phonegap-facebook-plugin
```

Install plugin for iOS platform:

```shell
$ cordova -d plugin add plugins/phonegap-facebook-plugin --variable APP_ID="APP_ID" --variable APP_NAME="APP_NAME"
```

# Optimizing for iPhone 6/6 Plus:

- In Xcode's App Icons and Launch Images section, select to use assets
- For third option, select the MainViewController.xib as the Launch Screen File