import { createTheme, ThemeProvider } from '@mui/material';
import Router from './components/router';
import { WithSnackbar } from './hocs/with-snackbar';

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
            <WithSnackbar>
                <Router />
            </WithSnackbar>
        </ThemeProvider>
    );
};

export default App;
