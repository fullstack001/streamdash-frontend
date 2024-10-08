import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Users',
    path: 'users',
    icon: icon('ic_user'),
  },
  {
    title: 'Devices',
    path: 'devices',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Credit history',
    path: 'credit-history',
    icon: icon('ic_lock'),
  },
  {
    title: 'Notification',
    path: 'set-notification',
    icon: icon('ic_blog'),
  },
  {
    title: 'FAQ Management',
    path: 'fac',
    icon: icon('ic_blog'),
  },
  {
    title: 'Promotion',
    path: 'promotion',
    icon: icon('ic_blog'),
  },
  {
    title: 'Footer',
    path: 'footer',
    icon: icon('ic_blog'),
  },
  {
    title: 'Product Pages',
    path: 'product',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
