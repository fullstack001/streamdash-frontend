import { Helmet } from 'react-helmet-async';

import { FooterView } from 'src/admin-sections/footer/view';

// ----------------------------------------------------------------------

export default function addDevicePage() {
  return (
    <>
      <Helmet>
        <title> Set Footer </title>
      </Helmet>

      <FooterView />
    </>
  );
}
