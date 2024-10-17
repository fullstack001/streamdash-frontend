/* eslint-disable perfectionist/sort-imports */

import 'src/global.css';
import { useEffect } from 'react';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useLocationStore } from 'src/store/locationStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        let country = 'world';

        if (data.country === 'CA') {
          country = 'canada';
        } else if (data.country === 'US') {
          country = 'USA';
        }

        setLocation({ country });
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation({ country: 'world' });
      }
    };

    fetchLocation();
  }, [setLocation]);

  return (
    <ThemeProvider>
      <Router />
      <ToastContainer />
    </ThemeProvider>
  );
}
