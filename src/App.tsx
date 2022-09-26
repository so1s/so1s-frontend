import { createTheme, ThemeProvider } from '@mui/material';
import Router from './components/router';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0A3B71',
        },
        error: {
            main: '#F45452',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    );
};

export default App;
