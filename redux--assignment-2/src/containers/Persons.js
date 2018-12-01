import React, { Component } from 'react';
import { connect } from 'react-redux';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import { addPerson, deletePerson } from '../actions/personActions';

class Persons extends Component {    

    personAddedHandler = (name, age) => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name,
            age
        }
        this.props.addPerson(newPerson);        
    }

    personDeletedHandler = (personId) => {        
        this.props.deletePerson(personId)        
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    persons: state.personData.persons
});

const mapDispatchToProps = {
    addPerson,
    deletePerson    
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);