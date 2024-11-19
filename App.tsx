import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceModal from "./DeviceConnectionModel";
import BLE from "./BLE";

// Main app component to handle Bluetooth device connection and disconnection
const App = () => {
  const {
    requestPermissions,
    startDeviceScan,
    availableDevices,
    connectToDevice,
    activeDevice,
    disconnectFromDevice,
  } = BLE();

  const [isModalVisible, setModalVisible] = useState<boolean>(false); // State for modal visibility
  const [connectionStatus, setConnectionStatus] = useState<string>(""); // State for displaying connection status

  // Initiate device scan after confirming necessary permissions
  const initiateDeviceScan = async () => {
    const hasPermissions = await requestPermissions();
    if (hasPermissions) {
      startDeviceScan(); // Start scanning if permissions are granted
    }
  };

  // Close the device modal
  const closeDeviceModal = () => {
    setModalVisible(false);
  };

  // Show the device modal and initiate scan
  const showDeviceModal = async () => {
    await initiateDeviceScan();
    setModalVisible(true);
  };

  // Handle device connection and update connection status
  const handleDeviceConnection = async (device: any) => {
    try {
      await connectToDevice(device);
      setConnectionStatus(
        `Device Connected: ${device.name || "Unknown Device"}`
      );
    } catch (error) {
      console.error("Connection Failed", error);
      setConnectionStatus("Device connection failed");
    }
  };

  // Handle device disconnection and update status
  const handleDisconnect = async () => {
    try {
      await disconnectFromDevice();
      setConnectionStatus("Device disconnected");
    } catch (error) {
      console.error("Disconnection Failed", error);
      setConnectionStatus("Failed to disconnect the device");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Connect to Bluetooth Devices</Text>
      </View>

      {/* Display connection status */}
      <Text style={styles.connectionStatus}>{connectionStatus}</Text>

      {/* Show connect/disconnect buttons based on device connection state */}
      <TouchableOpacity style={styles.button} onPress={showDeviceModal}>
        <Text style={styles.buttonText}>Show Devices</Text>
      </TouchableOpacity>

      {/* DeviceModal to manage device selection */}
      <DeviceModal
        devices={availableDevices}
        visible={isModalVisible}
        connectToPeripheral={handleDeviceConnection}
        closeModal={closeDeviceModal}
      />

      {activeDevice && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={handleDisconnect}
        >
          <Text style={styles.buttonText}>Disconnect</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  connectionStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default App;
