import { h } from 'preact';
import { Router } from 'preact-router';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import baseroute from '../../baseroute';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const App = () => (
	<ThemeProvider theme={darkTheme}>
		<CssBaseline />
		<div id="app">
			<Router>
				<Home path={`${baseroute}/`} />
			</Router>
		</div>
	</ThemeProvider>
)

export default App;
