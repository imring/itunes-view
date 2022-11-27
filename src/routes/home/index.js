import { h, Component, Fragment } from 'preact';

import style from './style.css';
import ItunesTable from '../../components/table'

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// https://mui.com/material-ui/react-app-bar/#app-bar-with-a-primary-search-field
const SearchSpace = styled('div')(({ theme }) => ({
	padding: theme.spacing(2)
}));

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	[theme.breakpoints.up('sm')]: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '25%',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

class Home extends Component {
	constructor() {
		super();
		this.state = { artist: "" };
	}

	render() {
		return <Fragment>
			<SearchSpace>
				<Search>
					<SearchIconWrapper><SearchIcon /></SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ 'aria-label': 'search' }}
						onChange={(event) => this.setState({ artist: event.target.value })}
						fullWidth
					/>
				</Search>
			</SearchSpace>
			<ItunesTable artist={this.state.artist} />
		</Fragment>
	}
}

export default Home;
