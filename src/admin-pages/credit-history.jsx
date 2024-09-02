import { Helmet } from 'react-helmet-async';

import { HistoryView } from 'src/admin-sections/credit-history/view';

// ----------------------------------------------------------------------

export default function CreditHistory() {
  return (
    <>
      <Helmet>
        <title> Credit History- admin| Streamdash </title>
      </Helmet>

      <HistoryView />
    </>
  );
}
