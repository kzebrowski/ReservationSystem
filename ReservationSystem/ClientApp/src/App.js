import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Rooms from './components/Rooms';
import Administration from './components/Administration';
import RoomEditor from './components/RoomEditor';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/rooms/(search)?/(stayStart)?/:startDate?/(stayEnd)?/:endDate?/(guests)?/:numberOfGuests?' component={Rooms} />
        <Route exact path='/admin' component={Administration} />
        <Route path='/admin/rooms/add' component={RoomEditor} />
      </Layout>
    );
  }
}
