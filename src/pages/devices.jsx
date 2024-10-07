import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/devices/view';

// ----------------------------------------------------------------------

export default function Devices() {
  return (
    <>
      <Helmet>
        <title> User | Stream Better TV </title>
      </Helmet>

      <UserView />
    </>
  );
}
