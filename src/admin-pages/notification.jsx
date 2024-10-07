import { Helmet } from 'react-helmet-async';

import { NotificationView } from 'src/admin-sections/notification/view';

// ----------------------------------------------------------------------

export default function addDevicePage() {
  return (
    <>
      <Helmet>
        <title> Streamdash – Stream TV Better </title>
      </Helmet>

      <NotificationView />
    </>
  );
}
