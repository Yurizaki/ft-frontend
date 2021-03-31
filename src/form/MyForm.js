import React from "react";

class MyForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: props.ticker };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.value);
		this.props.onSearch(this.state.value);
	}

	render() {
		return (
			<div className="row">

				<div className="column">
					<h1>Enter Ticker</h1>
				</div>
				<form className="column column-75" onSubmit={this.handleSubmit}>
					<input
						placeholder="IITU"
						autoComplete="off"
						required="required"
						onChange={this.handleChange}
					/>
					<button type="submit">
						<span>Submit</span>
					</button>
				</form>
			</div>
		);
	}
}

export default MyForm;