import { Helmet } from 'react-helmet-async';

import { AddDeviceView } from 'src/sections/add-device/view';

// ----------------------------------------------------------------------

export default function addDevicePage() {
  return (
    <>
      <Helmet>
        <title> Add Device </title>
      </Helmet>

      <AddDeviceView />
    </>
  );
}
