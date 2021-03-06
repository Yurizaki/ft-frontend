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
		// alert("A name was submitted: " + this.state.value);
		event.preventDefault();
        console.log(this.state.value);
        this.props.onSearch(this.state.value);
	}

	render() {
		return (
			<div className="subscribe-box">
				<h2></h2>
				<form className="subscribe" onSubmit={this.handleSubmit}>
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