import { createTheme } from '@mui/material/styles';

// Create a custom theme
export const montheme = createTheme({
  palette: {
    primary: {
      main: '#ffffe2', // Set your primary color
      task: '#ffffae',
      border: '#707045'
    },
  },
});

export const tuetheme = createTheme({
    palette: {
        primary: {
            main: '#ffe2e9', // Set your primary color
            task: '#ffaec4',
            border: '#70454f'
        },
    },
  });

export const wedtheme = createTheme({
    palette: {
    primary: {
        main: '#e2fff2', // Set your primary color
        task: '#aeffdc',
        border: '#45705d'
      },
    },
  });

export const thutheme = createTheme({
    palette: {
    primary: {
        main: '#fff1e2', // Set your primary color
        task: '#ffd9ae',
        border: '#705c45'
      },
    },
  });

export const fritheme = createTheme({
    palette: {
    primary: {
        main: '#e2f8ff', // Set your primary color
        task: '#aeecff',
        border: '#456670'
      },
    },
  });

export default {
    montheme,
    tuetheme,
    wedtheme,
    thutheme,
    fritheme
};