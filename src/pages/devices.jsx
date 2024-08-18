import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/devices/view';

// ----------------------------------------------------------------------

export default function Devices() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}
