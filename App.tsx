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

const App = () => {
  const {
    requestPermissions,
    startDeviceScan,
    availableDevices,
    connectToDevice,
    activeDevice,
  } = BLE();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<string>("");

  const initiateDeviceScan = async () => {
    const hasPermissions = await requestPermissions();
    if (hasPermissions) {
      startDeviceScan();
    }
  };

  const closeDeviceModal = () => {
    setModalVisible(false);
  };

  const showDeviceModal = async () => {
    await initiateDeviceScan();
    setModalVisible(true);
  };

  const handleDeviceConnection = async (device: any) => {
    try {
      // Connect to the device
      await connectToDevice(device);
      setConnectionStatus(
        `Device Connected: ${device.name || "Unknown Device"}`
      );
    } catch (error) {
      console.error("Connection Failed", error);
      setConnectionStatus("Device connection failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Connect to Bluetooth Devices</Text>
      </View>
      <TouchableOpacity
        onPress={showDeviceModal}
        style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
      >
        <Text style={styles.actionButtonText}>{"Connect"}</Text>
      </TouchableOpacity>

      {connectionStatus ? (
        <View style={styles.connectionStatus}>
          <Text style={styles.connectionStatusText}>{connectionStatus}</Text>
        </View>
      ) : null}

      <DeviceModal
        closeModal={closeDeviceModal}
        visible={isModalVisible}
        connectToPeripheral={handleDeviceConnection} // Pass the real connection function
        devices={availableDevices}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  actionButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  connectionStatus: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  connectionStatusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

export default App;
