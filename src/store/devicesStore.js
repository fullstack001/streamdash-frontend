import { create } from 'zustand';

const devicesStore = create((set) => ({
  devices: [],
  setDevices: (data) => set(() => ({ devices: data })),
}));

export default devicesStore;
