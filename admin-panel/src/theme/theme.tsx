import { extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat/100.css';
import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';

const breakpoints = {
  sm: '576px',
  md: '769px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
};

const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Montserrat, sans-serif',
};

const theme = extendTheme({
  breakpoints,
  fonts,
  colors: {
    white: '#FFFFFF',
    bg: {
      primary: '#B4C3C9',
      soft: '#e9f3f7',
    },
    brand: {
      primary: {
        500: '#3756b1',
        600: '#2b4389',
        700: '#1f3062',
        800: '#121d3a',
        900: '#050a15',
      },
    },
    soft: {
      gray: '#F1F3F4',
      text: '#575B68',
    },
    semantic: {
      success: '#48BB78',
      failure: '#E53E3E',
    },
  },
  components: {
    FormLabel: {
      variants: {
        primary: {
          fontSize: { base: '0.88rem', md: '0.9rem' },
          fontWeight: '600',
        },
      },
    },
    Text: {
      variants: {
        alpha: {
          fontSize: { base: 'sm', md: 'md', xl: 'lg' },
        },
      },
    },
    Heading: {
      variants: {
        formHeading: {
          fontSize: { base: 'md', md: 'xl' },
          fontWeight: 600,
          color: 'brand.primary.900',
        },
        sectionHeading: {
          fontSize: ['sm', 'md', 'lg'],
        },
      },
    },
    Button: {
      variants: {
        noBG: {
          fontSize: { base: 'sm', md: 'md', xl: 'lg' },
          color: 'brand.primary.900',
          _hover: {
            bg: 'brand.primary.700',
            color: 'white',
          },
        },
        primary: {
          fontSize: { base: 'xs', md: 'sm', xl: 'md' },
          color: 'white',
          bg: 'brand.primary.900',
          _hover: {
            bg: 'brand.primary.700',
            color: 'white',
          },
        },
      },
    },
  },
  styles: {
    global: () => ({
      body: {
        scrollBehaviour: 'smooth',
      },
    }),
  },
});

export default theme;
