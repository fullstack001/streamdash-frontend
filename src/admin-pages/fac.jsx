import { Helmet } from 'react-helmet-async';

import { FacView } from 'src/admin-sections/fac/view';

// ----------------------------------------------------------------------

export default function addDevicePage() {
  return (
    <>
      <Helmet>
        <title> Set Notification </title>
      </Helmet>

      <FacView />
    </>
  );
}
