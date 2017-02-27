import React, { Component } from 'react';
import _ from 'lodash';


import ControlRow from './ControlRow';

class Controls extends Component {
	state = {
		yearFilter: () => true,
		jobTitleFilter: () => true,
		USstateFilter: () => true,
		year: '*',
		USstate: '*',
		jobTitle: '*'
	};

	updateYearFilter(year, reset){
		let filter = (d) => d.submit_date.getFullYear() === year;

		if(reset || !year) {
			filter = () => true;
			year ='*';
		}

		this.setState({yearFilter: filter,
										year: year});
	}

	componentDidUpdate(){
		this.reportUpdate();
	}


	reportUpdate(){
		this.props.updateDataFilter(
			((filters) => {
				return (d) =>  filters.yearFilter(d);
			})(this.state),
			{ USstate: this.state.USstate,
				year: this.state.year,
				jobTitle: this.state.jobTitle
			}
		); // end main fn
	}

	// prevents infinite looping
	shouldComponentUpdate(nextProps, nextState) {
		console.log(this.state, nextState);
		return !_.isEqual(this.state, nextState);
	}

	render(){
		const data = this.props.data;

		const years = new Set(data.map( d => d.submit_date.getFullYear()));

		return (
			<div>
				<ControlRow data={data}
				            toggleNames={Array.from(years.values())}
				            picked={this.state.year}
				            updateDataFilter={this.updateYearFilter.bind(this)} />
			</div>
		)

	}

}

export default Controls;