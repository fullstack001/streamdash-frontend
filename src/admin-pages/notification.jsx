import { Helmet } from 'react-helmet-async';

import { NotificationView } from 'src/admin-sections/notification/view';

// ----------------------------------------------------------------------

export default function addDevicePage() {
  return (
    <>
      <Helmet>
        <title> Set Notification </title>
      </Helmet>

      <NotificationView />
    </>
  );
}
