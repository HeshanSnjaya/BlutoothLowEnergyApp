# BLE-Expo-App

A React Native application built with Expo for discovering and connecting to Bluetooth Low Energy (BLE) devices on Android and iOS platforms.

## Features

- Scan for nearby BLE devices.
- Connect to BLE devices.
- Disconnect from connected BLE devices.
- Cross-platform support (Android and iOS).

## Prerequisites

Before starting the project, ensure you have the following installed:

- **Node.js** (v16 or higher is recommended)
- **Expo CLI**
- A physical **Android/iOS** device (BLE is not supported on simulators/emulators).

For iOS:

- **macOS** with **Xcode** installed.

For Android:

- **Android Studio** and a device running **Android 6.0** or higher.

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ble-expo-app.git
cd ble-expo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Expo Development Environment

Install the Expo Go app on your mobile device:

- [Expo Go for Android]
- [Expo Go for iOS]

### 4. Start the Development Server

For both platforms:

For **Android**:

```bash
npx expo run:android
```

For **iOS**:

```bash
npx expo start
```

> **Note**: For physical iOS devices, the app must be built using **Xcode** or **Expo EAS** due to BLE restrictions. If you're building the app for iOS via EAS, run the following command:

```bash
eas build --profile development --platform ios
```

---

## Permissions Configuration

### Android

Add the following permissions to your `AndroidManifest.xml` if they are not already present:

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
```

For **Android 12+** (API level 31), ensure you configure both **BLUETOOTH_SCAN** and **BLUETOOTH_CONNECT** permissions.

### iOS

Update `Info.plist` with the following:

```xml
<key>NSBluetoothAlwaysUsageDescription</key>
<string>This app uses Bluetooth to connect to devices.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Location access is required to scan for nearby devices.</string>
```

---

## Folder Structure

- **App.tsx**: Main entry point of the app.
- **BLE.ts**: Contains logic for handling BLE connections and device scanning.
- **DeviceConnectionModule.tsx**: UI for listing and connecting to BLE devices.

---

## Development Notes

### Debugging

Use `console.log` statements in **BLE.ts** to debug issues while scanning or connecting to devices.

### Testing on Physical Devices

BLE requires physical devices for testing. Ensure that your device's **Bluetooth** is enabled.

### Troubleshooting

- **Unable to find devices**: Check device permissions and ensure the target device is advertising BLE services.
- **Connection issues**: Ensure the BLE device is not paired directly with the phone via system settings.

---

## Additional Notes

### iOS App Testing and Build

Due to BLE restrictions, for iOS, the app must be built and installed using **Xcode** or through **Expo EAS**.

1. **Build the iOS app using Expo EAS**:

   ```bash
   eas build --profile development --platform ios
   ```

   You will receive a link to download the `.ipa` file once the build is complete.

2. **Test on a physical device**:

   - Once built, you can use **TestFlight** for iOS testing or install the `.ipa` file via Xcode.

3. **Xcode Build Setup**: If you prefer to build the app locally, you can open the `ios/` directory in Xcode and run the project from there.

---
