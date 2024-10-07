import { Helmet } from 'react-helmet-async';

import { HistoryView } from 'src/sections/credit-history/view';

// ----------------------------------------------------------------------

export default function CreditHistory() {
  return (
    <>
      <Helmet>
        <title>Streamdash – Stream TV Better </title>
      </Helmet>

      <HistoryView />
    </>
  );
}
