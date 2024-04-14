import React from 'react';
import Person from './Person';

const Persons = ({ persons, onDeletePerson }) => {
  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onDeletePerson={() => onDeletePerson(person.id)}
        />
      )}
    </div>
  );
}

export default Persons;
