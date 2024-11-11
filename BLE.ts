import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";

interface BLEInterface {
  requestPermissions(): Promise<boolean>;
  startDeviceScan(): void;
  availableDevices: Device[];
  connectToDevice: (device: Device) => Promise<void>;
  activeDevice: Device | null;
}

function BLE(): BLEInterface {
  const bleManager = useMemo(() => new BleManager(), []);
  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [activeDevice, setActiveDevice] = useState<Device | null>(null);

  const requestPermissionsAndroid31 = async () => {
    const permissions = await Promise.all([
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: "Bluetooth Scan Permission",
          message: "Bluetooth scan access required",
          buttonPositive: "OK",
        }
      ),
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "Bluetooth Connect Permission",
          message: "Bluetooth connection access required",
          buttonPositive: "OK",
        }
      ),
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Location access required for Bluetooth",
          buttonPositive: "OK",
        }
      ),
    ]);

    return permissions.every((result) => result === "granted");
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const locationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires location access",
            buttonPositive: "OK",
          }
        );
        return locationPermission === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return await requestPermissionsAndroid31();
      }
    } else {
      return true;
    }
  };

  const isDuplicateDevice = (devices: Device[], newDevice: Device) =>
    devices.some((device) => newDevice.id === device.id);

  const startDeviceScan = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
      }
      if (device) {
        setAvailableDevices((prevDevices) => {
          if (!isDuplicateDevice(prevDevices, device)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      const connection = await bleManager.connectToDevice(device.id);
      setActiveDevice(connection);
      await connection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
    } catch (error) {
      console.error("Connection Failed", error);
      throw error; // Throw the error to propagate it back to the caller
    }
  };

  return {
    startDeviceScan,
    requestPermissions,
    availableDevices,
    connectToDevice,
    activeDevice,
  };
}

export default BLE;
