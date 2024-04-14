import React from 'react';

const Person = ({ id, name, number, onDeletePerson }) => {
  return (
    <div>
      {name} {number} <button onClick={() => onDeletePerson(id,name)}>delete</button>
    </div>
  );
}

export default Person;
