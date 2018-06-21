import React, { Component } from 'react';
import classes from './App.css'
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);
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
			showPersons: false,
			toggleClicked: 0,
			authenticated: false
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
		this.setState((prevState, props) => { 			
			return {
				showPersons: !doesShow,
				toggleClicked: prevState.toggleClicked + 1
			}			
		 });
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


	/**
	 * Sometimes you have cases where you receive new props
	 * and you want to update your local state because maybe you want
	 * to work with that state you want to change in that component before a user clicks
	 * like a save button and you committed up the state three component tree
	 * in your anpp and then you can change it somewhere else and they are free to change your props again 
	 */
static getDerivedStateFromProps(nextProps, prevState) {
		console.log(
			'[UPDATE App.js] inside getDerivedStateFromProps',
			nextProps,
			prevState
		);		
		return prevState;
	}

	/**
	 * This lifecycle trigger right before the dom tree is updated
	 */
	getSnapshotBeforeUpdate() {
		console.log(
			'[UPDATE App.js] inside getSnapshotBeforeUpdate'		
		);				
	}

	componentDidUpdate() {
		console.log('[UPDATE App.js] inside componentdidUpdate');
	}

	loginHandler = () => {
		this.setState({ authenticated: true });
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
			<Aux>				
			<button onClick={() => { this.setState( { showPersons: true } ) }}>Show Persons</button>
				<Cockpit
					appTitle={this.props.title}
					showPersons={this.state.showPersons}
					persons={this.state.persons}
					clicked={this.togglePersonsHandler}					
					login={this.loginHandler}					
				/>
				<AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>				
			</Aux>			
		);
	}
}

export default withClass(App, classes.App);
