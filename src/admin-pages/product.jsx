import { Helmet } from 'react-helmet-async';

import { ProductView } from 'src/admin-sections/products/view';

// ----------------------------------------------------------------------

export default function Devices() {
  return (
    <>
      <Helmet>
        <title> Products | Streamdash </title>
      </Helmet>

      <ProductView />
    </>
  );
}
