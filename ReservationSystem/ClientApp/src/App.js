import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Rooms from './components/Rooms';
import Administration from './components/Administration';
import RoomEditor from './components/RoomEditor';
import history from './history';
import UserPage from './components/UserPage';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Router history={history}>
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/rooms/(search)?/(stayStart)?/:startDate?/(stayEnd)?/:endDate?/(guests)?/:numberOfGuests?' component={Rooms} />
            <Route exact path='/admin' component={Administration} />
            <Route path='/admin/rooms/add' component={RoomEditor} />
            <Route path='/admin/rooms/edit/:id' component={RoomEditor} />
            <Route path='/myaccount' component={UserPage} />
        </Layout>
      </Router>
    );
  }
}
