import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/admin-sections/devices/view';

// ----------------------------------------------------------------------

export default function Devices() {
  return (
    <>
      <Helmet>
        <title> Streamdash – Stream TV Better </title>
      </Helmet>

      <UserView />
    </>
  );
}
