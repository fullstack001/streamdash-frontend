import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Devices',
    path: 'devices',
    icon: icon('ic_user'),
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
];

export default navConfig;
