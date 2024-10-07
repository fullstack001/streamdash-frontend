import { create } from 'zustand';

export const useLocationStore = create((set) => ({
  country: 'world',
  setLocation: ({ country }) => set({ country }),
}));
