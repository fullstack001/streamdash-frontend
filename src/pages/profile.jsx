import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> ResetPassword | Streamdash – Stream TV Better </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
