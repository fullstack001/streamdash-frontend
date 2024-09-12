import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Buy credits',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Add device',
    path: '/add-device',
    icon: icon('ic_cart'),
  },
  {
    title: 'Devices',
    path: '/all-devices',
    icon: icon('ic_user'),
  },
  {
    title: 'Credit history',
    path: '/credit-history',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
