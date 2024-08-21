import { create } from 'zustand';

const devicesStore = create((set) => ({
  devices: [],
  userDevices: [],
  setDevices: (data) => set(() => ({ devices: data })),
  setUserDevices: (data) => set(() => ({ userDevices: data })),
  updateDevice: (loginId, newData) =>
    set((state) => ({
      devices: state.devices.map((device) =>
        device.loginId === loginId ? { ...device, ...newData } : device
      ),
    })),

  updateUserDevice: (username, newData) =>
    set((state) => ({
      userDevices: state.userDevices.map((userDevice) =>
        userDevice.username === username ? { ...userDevice, ...newData } : userDevice
      ),
    })),
}));

export default devicesStore;
