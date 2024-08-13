import { create } from 'zustand';

const authStore = create((set) => ({
  isAuth: false,
  setAuth: (flag) => set(() => ({ isAuth: flag })),
}));

export default authStore;
