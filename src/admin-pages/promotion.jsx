import { Helmet } from 'react-helmet-async';

import { PromotionView } from 'src/admin-sections/promotion/view';

// ----------------------------------------------------------------------

export default function addDevicePage() {
  return (
    <>
      <Helmet>
        <title> Streamdash – Stream TV Better </title>
      </Helmet>

      <PromotionView />
    </>
  );
}
