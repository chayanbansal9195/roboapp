import React, { useEffect, useState } from 'react';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

import ErrorBoundaries from './ErrorBoundaries';

import './App.css';

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');

  //   life cycle
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => setRobots(users))
  }, []);
  //   functions
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };
  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });
  if (!robots.length) return <h1>Loading</h1>;
  else {
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundaries>
            <CardList robots={filteredRobots} />
          </ErrorBoundaries>
        </Scroll>
      </div>
    );
  }
};

export default App;
