import { createTheme, ThemeProvider } from '@mui/material';
import Router from './components/router';
import { WithAuth } from './hocs/with-auth';
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
            <WithAuth>
                <WithSnackbar>
                    <Router />
                </WithSnackbar>
            </WithAuth>
        </ThemeProvider>
    );
};

export default App;
