import { Helmet } from 'react-helmet-async';

import { SupportView } from 'src/sections/support/view';

// ----------------------------------------------------------------------

export default function SupportPage() {
  return (
    <>
      <Helmet>
        <title>Streamdash – Stream TV Better </title>
      </Helmet>
      <SupportView />
    </>
  );
}
