import * as React from 'react';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import {Provider} from 'react-redux';
import theme from './constants/theme/theme.const';
import SignIn from './components/signin/index';
import {setupStore} from './store/store';

const store = setupStore();

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline/>
					<SignIn/>
				</Container>
			</ThemeProvider>
		</Provider>
	);
};

export default App;