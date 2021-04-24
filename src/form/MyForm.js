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
		this.props.onSearch(this.state.value);
	}

	render() {
		return (
			<div className="column column-60">
				<div className="row">
					<div className="column column-40 ">
						<input
							placeholder="IITU"
							autoComplete="off"
							required="required"
							onChange={this.handleChange}
						/>
					</div>
					<div className="column column-10">
						<button onClick={this.handleSubmit}>
							<span>Submit</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default MyForm;