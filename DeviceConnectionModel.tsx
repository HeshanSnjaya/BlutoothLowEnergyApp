import React, { FC, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Device } from "react-native-ble-plx";

interface DeviceListItemProps {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
}

interface DeviceModalProps {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
}

const DeviceListItem: FC<DeviceListItemProps> = ({
  item,
  connectToPeripheral,
  closeModal,
}) => {
  const handleConnectAndClose = useCallback(() => {
    connectToPeripheral(item.item);
    closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <TouchableOpacity
      onPress={handleConnectAndClose}
      style={[modalStyles.button, { backgroundColor: "#4CAF50" }]}
    >
      <Text style={modalStyles.buttonText}>
        {item.item.name || "Unknown Device"} - {item.item.id}
      </Text>
    </TouchableOpacity>
  );
};

const DeviceModal: FC<DeviceModalProps> = ({
  devices,
  visible,
  connectToPeripheral,
  closeModal,
}) => {
  const renderDeviceItem = useCallback(
    (item: ListRenderItemInfo<Device>) => (
      <DeviceListItem
        item={item}
        connectToPeripheral={connectToPeripheral}
        closeModal={closeModal}
      />
    ),
    [closeModal, connectToPeripheral]
  );

  return (
    <Modal
      style={modalStyles.container}
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <SafeAreaView style={modalStyles.header}>
        <Text style={modalStyles.headerText}>Select a device to connect</Text>
        <FlatList
          contentContainerStyle={modalStyles.listContainer}
          data={devices}
          renderItem={renderDeviceItem}
        />
      </SafeAreaView>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  headerText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default DeviceModal;
