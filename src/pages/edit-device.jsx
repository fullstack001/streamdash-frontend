import { Helmet } from 'react-helmet-async';

import { EditDeviceView } from 'src/sections/edit-device/view';

// ----------------------------------------------------------------------

export default function Devices() {
  return (
    <>
      <Helmet>
        <title> Edit Device |Streamdash – Stream TV Better </title>
      </Helmet>

      <EditDeviceView />
    </>
  );
}
