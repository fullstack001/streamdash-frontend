import { create } from 'zustand';

const devicesStore = create((set) => ({
  devices: [],
  setAuth: (data) => set(() => ({ devices: data })),
}));

export default devicesStore;
