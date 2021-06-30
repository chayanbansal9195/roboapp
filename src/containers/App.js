import React, { Component } from 'react';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

import ErrorBoundaries from './ErrorBoundaries';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: '',
    };
  }
  //   life cycle
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
      res.json().then((users) => this.setState({ robots: users }))
    );
  }
  //   functions
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };
  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (!robots.length) return <h1>Loading</h1>;
    else {
      return (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundaries>
              <CardList robots={filteredRobots} />
            </ErrorBoundaries>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;