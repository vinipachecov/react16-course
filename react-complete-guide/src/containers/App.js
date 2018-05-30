import React, { Component } from 'react';
import classes from './App.css'
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
	constructor(props) {
		super(props);
		console.log('[Appsjs] inside the constructor')
		this.state = {
			persons: [
				{ id: '1', name: 'Max', age: 28 },
				{ id: '2', name: 'Manu', age: 29 },
				{ id: '3', name: 'Stephanie', age: 26 },
			],
			showPersons: false
		}
	}

	componentWillMount() {
		console.log('[App.js] inside component will mount');
	}

	componentDidMount() {
		console.log('[App.js] inside component did mount');
	}

	// state = {
	//   persons: [
	//     { id: '1', name: 'Max', age: 28 },
	//     { id: '2', name: 'Manu', age: 29 },
	//     { id: '3', name: 'Stephanie', age: 26 },
	//   ],
	//   showPersons: false
	// }

	switchNameHandler = (newName) => {
		//console.log('btn clicked!');
		this.setState({
			persons: [
				{ name: newName, age: 28 },
				{ name: 'Manu', age: 29 },
				{ name: 'Stephanie', age: 35 },
			]
		})
	}

	nameChangeHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex]
		};

		// const person = Object.assign({}, this.state.persons[personIndex])

		person.name = event.target.value;

		const persons = [...this.state.persons];

		persons[personIndex] = person;
		this.setState({ persons });
	}

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	}

	deletePersonHandler = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({ persons });
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('[UPDATE App.js] inside shouldcomponentupdate', nextProps, nextState);
		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE App.js] inside componentwillUpdate', nextProps, nextState);
	}

	componentDidUpdate() {
		console.log('[UPDATE App.js] inside componentdidUpdate');
	}

	render() {
		console.log('[App.js] inside render')
		let persons = null;

		if (this.state.showPersons) {
			persons = <Persons
				persons={this.state.persons}
				clicked={this.deletePersonHandler}
				changed={this.nameChangeHandler}
			/>;
		}
		return (
			<div className={classes.App}>
			<button onClick={() => { this.setState( { showPersons: true } ) }}>Show Persons</button>
				<Cockpit
					appTitle={this.props.title}
					showPersons={this.state.showPersons}
					persons={this.state.persons}
					clicked={this.togglePersonsHandler}
				/>
				{persons}
			</div>
		);
	}
}

export default App;
