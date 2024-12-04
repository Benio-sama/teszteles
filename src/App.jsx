import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name && !age) {
      alert('Please fill out both fields.');
    } else {
      if (name) {
        if (age) {
          if (age >= 0) {
            setUsers([...users, { name, age }]);
            setName('');
            setAge('');
            alert('User added to the list.')
          } else {
            alert('Age cannot be negative.');
          }
        } else {
          alert('Error: Age is required.');
        }
      } else {
        alert('Error: Name is required.');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple User Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <button type="submit">Add User</button>
        </form>
        <h2>Users List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.age} years old
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
