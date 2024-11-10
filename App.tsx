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
      <DeviceModal
        closeModal={closeDeviceModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
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
});

export default App;
