import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/admin-sections/devices/view';

// ----------------------------------------------------------------------

export default function Devices() {
  return (
    <>
      <Helmet>
        <title> Devices | Streamdash </title>
      </Helmet>

      <UserView />
    </>
  );
}
