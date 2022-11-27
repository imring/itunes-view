import { h, Component, Fragment } from 'preact';

import style from './style.css';
import { searchTracks } from '../../libs/itunes';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(4n+1), &:nth-of-type(4n+2)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide borders
	'& td, & th': { border: 0 },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	// '&:nth-of-type(8n+1), &:nth-of-type(8n+2), &:nth-of-type(8n+3), &:nth-of-type(8n+4)': {
	// 	backgroundColor: theme.palette.action.hover,
	// },
	'&': {
		paddingBottom: 0,
		paddingTop: 0,
		border: 0
	},
}));

function getArtworkUrl(info) {
	return info.artworkUrl100 || info.artworkUrl60 || info.artworkUrl30; // lmao
}

function getTime(ms) {
	const sec = ms / 1000;
	const min = Math.floor(sec / 60);
	
	let secstr = String(Math.floor(sec - min * 60));
	if (secstr.length == 1)
		secstr = '0' + secstr;
	return `${min}:${secstr}`
}

class Row extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { info, onCollapse, collapse } = this.props;
		return <Fragment>
			<StyledTableRow key={info.name}>
				<TableCell scope="center" className={style.image}>
					<img src={getArtworkUrl(info)}></img>
				</TableCell>
				<TableCell align="left">{info.artistName}</TableCell>
				<TableCell align="left">{info.trackName}</TableCell>
				<TableCell align="left">{info.collectionCensoredName}</TableCell>
				<TableCell align="left">{info.primaryGenreName}</TableCell>
				<TableCell align="right">
					<button class={style.expand} onClick={() => onCollapse()}>
						{collapse ? '-' : '+'}
					</button>
				</TableCell>
			</StyledTableRow>

			{/* collapse */}
			<StyledTableRow key={info.name + "collapse"}>
				<StyledTableCell colSpan={1} />
				<StyledTableCell colSpan={2}>
					<Collapse in={collapse} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 2, marginLeft: 0 }}>
							<h2 class={style.title}>{info.artistName} - {info.trackName}</h2> <br />
							<b>Collection: </b>{info.collectionCensoredName} <br />
							<b>Track count: </b>{info.trackCount} <br />
							<b>Price: </b>{info.collectionPrice} {info.currency} <br />
						</Box>
					</Collapse>
				</StyledTableCell>
				<StyledTableCell colSpan={1}>
					<Collapse in={collapse} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 2, marginLeft: 0 }}>
							<b>Track duration: </b>{getTime(info.trackTimeMillis)} <br />
							<b>Track price: </b>{info.trackPrice} {info.currency} <br />
						</Box>
					</Collapse>
				</StyledTableCell>
				<StyledTableCell colSpan={2} />
			</StyledTableRow>
		</Fragment>
	}
}

class ItunesTable extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [], expand: -1 };
	}

	onCollapse(idx) {
		if (idx == this.state.expand)
			this.setState({ expand: -1 }) // close
		else
			this.setState({ expand: idx })
	}

	async update() {
		this.onCollapse(-1);
		const response = await searchTracks({ term: this.props.artist, entity: "song", attribute: "artistTerm" });
		this.setState({ data: response });
	}

	async componentDidMount() { await this.update() }

	async componentDidUpdate(prevProps) {
		if (prevProps.artist && prevProps.artist !== this.props.artist)
			await this.update()
	}

	render() {
		return <TableContainer component={Paper} className={style.table}>
		<Table aria-label="tracks">
			<TableHead>
				<TableRow>
					<TableCell align="left">{/*album cover */}</TableCell>
					<TableCell align="left">Artist</TableCell>
					<TableCell align="left">Track</TableCell>
					<TableCell align="left">Collection</TableCell>
					<TableCell align="left">Genre</TableCell>
					<TableCell align="right">{/* expand */}</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{this.state.data.map((row, idx) =>
					<Row info={row} collapse={idx == this.state.expand} onCollapse={() => this.onCollapse(idx)} />
				)}
			</TableBody>
		</Table>
	 	</TableContainer>
	}
}

export default ItunesTable;
