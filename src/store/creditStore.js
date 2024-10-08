import Cookies from 'js-cookie';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export const useCreditStore = create((set) => ({
  credit: 0,
    setCreditFuntion: () => {
        const token = Cookies.get('token');
        if(token){
            const decoded = jwtDecode(token);
            const newCredit = decoded.user.credit;
            set({ credit: newCredit });
        } else {
            set({ credit: 0 });
        }
    },
}));
