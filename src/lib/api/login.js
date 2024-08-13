import axios from 'axios';

export default function login() {
  axios
    .post(`api/login`, {
      c_token: '042ca036df32b88e7dcb1f19d9c1dba6',
      login: 'vrushankshah',
      password: 'vrushankshah',
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
