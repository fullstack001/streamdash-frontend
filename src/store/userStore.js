import { create } from 'zustand';

const initialState = {
  isAuth: false,
  email: '',
  id: '',
  isAdmin: false,
  credit: 0,
  name: '',
};

const userStore = create((set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ ...user })),
}));

export default userStore;
