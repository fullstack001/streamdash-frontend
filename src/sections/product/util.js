import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function isAdmin() {
  const token = Cookies.get('token');
  if (!token) return false;
  const decoded = jwtDecode(token);
  return decoded.user.isAdmin;
}
