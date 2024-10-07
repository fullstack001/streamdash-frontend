import { Helmet } from 'react-helmet-async';

import { FooterView } from 'src/admin-sections/footer/view';

// ----------------------------------------------------------------------

export default function addDevicePage() {
  return (
    <>
      <Helmet>
        <title> Streamdash – Stream TV Better </title>
      </Helmet>

      <FooterView />
    </>
  );
}
