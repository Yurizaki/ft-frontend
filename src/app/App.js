import React, { Component } from "react";
import MyForm from "../form/MyForm.js";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			ticker: "",
			name: "",
			holdings: null,
		};
	}

	handle(ticker) {
		console.log("here");
		console.log(ticker);

		// fetch("http://localhost:8080/fund?ticker=" + ticker)
		// 	.then((res) => res.json())
		// 	.then((data) => {

		// 		this.setState({
		// 			name: data.name,
		// 			holdings: data.holdings,
		// 		});

		// 		console.log(data.name);
		// 		console.log(data.ticker);
		// 		console.log(data.holdings);
		// 	})
		// 	.catch(console.log);
	}

	render() {
		const numbers = [1, 2, 3, 4, 5];

		return (
			<div className='site'>
				<MyForm
					onSearch={(ticker) => this.handle(ticker)}
					value={this.state.ticker}
				/>

				<h1>{this.state.name}</h1>

				<NumberList numbers={numbers} holdings={this.state.holdings} />
			</div>
		);
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
