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
import UserActivation from './components/UserActivation';
import PasswordChange from './components/PasswordChange';

export default class App extends Component {
  displayName = App.name

  constructor(props) {
    super(props);

    this.state = { isUserLoggedIn: localStorage.getItem("token") }

    this.setIsUserLoggedIn = this.setIsUserLoggedIn.bind(this);
  }

  setIsUserLoggedIn(value) {
    this.setState({isUserLoggedIn: value});
  }

  render() {
    return (
      <Router history={history}>
        <Layout setIsUserLoggedIn={this.setIsUserLoggedIn} isUserLoggedIn={this.state.isUserLoggedIn}>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/rooms/(search)?/(stayStart)?/:startDate?/(stayEnd)?/:endDate?/(guests)?/:numberOfGuests?' component={Rooms} />
            { this.state.isUserLoggedIn && localStorage.isUserAdmin === 'true' && <Route exact path='/admin' component={Administration} /> }
            { this.state.isUserLoggedIn && localStorage.isUserAdmin === 'true' && <Route path='/admin/rooms/add' component={RoomEditor} /> }
            { this.state.isUserLoggedIn && localStorage.isUserAdmin === 'true' && <Route path='/admin/rooms/edit/:id' component={RoomEditor} /> }
            { this.state.isUserLoggedIn && localStorage.token && <Route path='/myaccount' component={UserPage} /> }
            <Route path='/activate/:email/:code' component={UserActivation} />
            <Route path='/resetPassword/:userId/:code' component={PasswordChange} />
        </Layout>
      </Router>
    );
  }
}
