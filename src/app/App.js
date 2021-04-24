import React, { Component } from "react";
import MyForm from "../form/MyForm.js";
import "./App.css";

import data from './data/data.json'

class App extends Component {

	constructor() {
		super();
		this.state = {
			ticker: "",
			name: "",
			holdings: null,
			history: [],
			tickerHistory: [],
			search: "",
			apiUrl: "",
			fundEndpoint: ""
		};

		let localData = JSON.parse(localStorage.getItem('alexData'));
		if (localData) {
			let localHistory = localData.dataHistory;
			let localTickerHistory = localData.tickerHistory
			this.state.history = localHistory;
			this.state.tickerHistory = localTickerHistory;
		}

		this.state.apiUrl = process.env.REACT_APP_API_URL;
		this.state.fundEndpoint = process.env.REACT_APP_FUND_END_POINT;

		if (process.env.NODE_ENV === 'production') {
			console.log('AMAZING')
		}
	}

	componentDidMount() {
		if(process.env.NODE_ENV === 'development') {
			const t = data;
			this.setState({
				name: t.fund.name,
				holdings: t.fund.holdings,
				search: t.search,
			});
		}
	}

	apiCall(ticker) {
		console.log(process.env.REACT_APP_API_URL);
		console.log(process.env.REACT_APP_FUND_END_POINT);
		let url = this.state.apiUrl + this.state.fundEndpoint;

		console.log(url);
		console.log(ticker);
		fetch(url + ticker)
		.then((res) => res.json())
		.then((data) => {

			if (!data.status) {
				this.setState({
					name: data.fund.name,
					holdings: data.fund.holdings,
					search: data.search,
				});

				this.addToHistory(ticker);
			}
			else {
				console.log(data.status);
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}

	saveToCache(dataToSave) {
		localStorage.setItem('alexData', JSON.stringify(dataToSave));
	}

	addToHistory(ticker) {
		let locTickerHistory = this.state.tickerHistory;
		let locHistory = this.state.history;

		if (!locTickerHistory.includes(ticker)) {
			let newEntry = { ticker: ticker };

			locHistory.push(newEntry);
			locTickerHistory.push(ticker);

			this.setState({history: locHistory});
			this.setState({tickerHistory: locTickerHistory});

			this.saveToCache({tickerHistory: locTickerHistory, dataHistory: locHistory});
		}
	}

	handle(ticker) {
		console.log("here");
		this.apiCall(ticker);
	}

	reset() {
		localStorage.removeItem('alexData');

		this.setState({
			history: [],
			tickerHistory: []
		});
	}

	signIn() {

	}

	render() {
		return (
			<div className="container">
				
				<div className="row">
					<div className="column column-30">
						<div className="row">
							<div className="column">
							</div>
						</div>
					</div>
					
					<MyForm
						onSearch={(ticker) => this.handle(ticker)}
						value={this.state.ticker}
					/>
						
					<div className="column column-10">
						<div className="row">
							<div className="column">
								<button className="button" onclick='signIn'>Sign In</button>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="column column-25">
						<div className="row">
							<button disabled>Save Session</button>
						</div>
						<div className="row">
							<button onClick={() => this.reset()}>
								Reset Session
							</button>
						</div>
					</div>
					<div className="column column-75">
						<h1>
							<a
								href={this.state.search}
								rel="noreferrer"
								target="_blank"
							>
								{this.state.name}
							</a>
						</h1>
					</div>
				</div>

				<div className="row">
					<div className="column">
						<HistoryList history={this.state.tickerHistory} />
					</div>
					<div className="column column-75">
						<NumberList holdings={this.state.holdings} />
					</div>
				</div>
			</div>
		);
	}
}

function HistoryList(props) {
	const history = props.history;

	if(history) {

		const listHoldings = history.map((ticker) => (
			<tr key={ticker}>
				<td><a>{ticker}</a></td>
			</tr>
		));

		return (
			<div>
				<table>
					<tbody>
						{listHoldings}
					</tbody>
				</table>
			</div>
		)
	}
}

function NumberList(props) {
	const holdings = props.holdings;

	console.log(holdings);
	if (holdings) {
		const listHoldings = holdings.map((holding) => (
			<tr key={holding.name}>
				<td>{holding.name}</td>
				<td>{holding.yearChange}</td>
				<td>{holding.weight}</td>
			</tr>
		));

		return (
			<div>
				<div className='tbl-header'>
					<table>
						<thead >
							<tr>
								<td>Holding name</td>
								<td>Year change</td>
								<td>Weight in fund</td>
							</tr>
						</thead>
					</table>
				</div>
				<div className='tbl-content'>
					<table>
						<tbody>
							{listHoldings}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	return null;
}

export default App;
