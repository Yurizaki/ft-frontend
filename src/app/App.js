import React, { Component } from "react";
import MyForm from "../form/MyForm.js";
import "./App.css";

require('dotenv').config()

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
		};

		let localData = JSON.parse(localStorage.getItem('alexData'));
		if (localData) {
			let localHistory = localData.dataHistory;
			let localTickerHistory = localData.tickerHistory
			this.state.history = localHistory;
			this.state.tickerHistory = localTickerHistory;
		}
	}

	componentDidMount() {
		if(window.location.hostname.includes('localhost')) {
			const testData = '{ "fund" : { "name" : "iShares S&P 500 Information Technology Sector UCITS ETF USD (Acc), IITU", "ticker" : "IITU", "holdings" : [ { "name" : "Apple Inc AAPL", "yearChange" : "+88.22%", "weight" : "21.65%" }, { "name" : "Microsoft Corp MSFT", "yearChange" : "+44.70%", "weight" : "19.19%" }, { "name" : "Visa Inc V", "yearChange" : "+27.98%", "weight" : "4.11%" }, { "name" : "Mastercard Inc MA", "yearChange" : "+41.44%", "weight" : "3.67%" }, { "name" : "NVIDIA Corp NVDA", "yearChange" : "+93.86%", "weight" : "3.65%" }, { "name" : "PayPal Holdings Inc PYPL", "yearChange" : "+143.78%", "weight" : "3.19%" }, { "name" : "Intel Corp INTC", "yearChange" : "+14.92%", "weight" : "2.93%" }, { "name" : "Adobe Inc ADBE", "yearChange" : "+46.19%", "weight" : "2.52%" }, { "name" : "Cisco Systems Inc CSCO", "yearChange" : "+28.40%", "weight" : "2.44%" }, { "name" : "Salesforce.Com Inc CRM", "yearChange" : "+40.14%", "weight" : "2.24%" } ] }, "search" : "https://markets.ft.com/data/etfs/tearsheet/holdings?s=IITU" }';
			const data = JSON.parse(testData);
			this.setState({
				name: data.fund.name,
				holdings: data.fund.holdings,
				search: data.search,
			});
		}

	}

	apiCall(ticker) {
		console.log(process.env.TOKEN);

		let prodUrl = 'https://stormy-ridge-08228.herokuapp.com//fund?ticker=';
		let testUrl = 'http://localhost:8080/fund?ticker=';
		let url = window.location.hostname.includes('localhost') ? testUrl : prodUrl;

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

	render() {
		return (
			<div className='container'>
				<MyForm
					onSearch={(ticker) => this.handle(ticker)}
					value={this.state.ticker}
				/>

				<div className="row">
					<div className="column column-25">
						<div className="row">
							<button disabled>Save Session</button>
						</div>
						<div className="row">
							<button onClick={() => this.reset()}>Reset Session</button>
						</div>
					</div>
					<div className="column column-75">
						<h1><a href={this.state.search} rel="noreferrer" target="_blank">{this.state.name}</a></h1>
					</div>
				</div>

				<div className="row">
					<div className="column">
						<HistoryList 
							history={this.state.tickerHistory}
						/>
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
