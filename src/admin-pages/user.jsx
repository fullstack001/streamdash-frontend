import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/admin-sections/users/view';

// ----------------------------------------------------------------------

export default function Devices() {
  return (
    <>
      <Helmet>
        <title> Users | Streamdash </title>
      </Helmet>

      <UserView />
    </>
  );
}
