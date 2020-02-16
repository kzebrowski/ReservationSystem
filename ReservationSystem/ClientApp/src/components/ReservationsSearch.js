import React, { Component } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/SearchForm.css';
import Axios from 'axios';

export default class ReservationSearch extends Component {
  displayName = ReservationSearch.name;

  constructor(props) {
    super(props);

    this.state = { searchType: 0, email: '', phoneNumber: '', emailHasErrors: false, phoneNumberHasErrors: false };

    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  handleSearchTypeChange(event) {
    event.preventDefault();

    this.setState({ searchType: Number(event.target.value) === 0 ? 0 : 1 });
  }

  handleEmailChange(event) {
    event.preventDefault();

    this.setState({ email: event.target.value });
  }

  handlePhoneNumberChange(event) {
    event.preventDefault();

    this.setState({ phoneNumber: event.target.value });
  }

  sendRequest(event) {
    event.preventDefault();
    
    let requestData;
    let requestUrl;

    switch (this.state.searchType) {
      case 0:
        requestData = this.state.email;
        requestUrl = '/getbyemail/';
        break;
      case 1:
        requestData = this.state.phoneNumber;
        requestUrl = '/getbyphonenumber/';
        break;
      default:
        console.error('Enum SearchType is out of range');
        return;
    }

    this.props.setLoading(true);

    Axios.get('/api/reservations' + requestUrl + requestData, { headers: { Authorization: "Bearer " + localStorage.token } })
      .then(response => this.props.setReservations(response.data))
      .catch(() => this.props.setReservations([]))
      .finally(() => this.props.setLoading(false));
  }

  render() {
    return (
      <div className="search-form">
        <form onSubmit={this.sendRequest}>
          <div className="search-form-content">
            {this.state.searchType == 0 ?
              <input className="search-form-item" placeholder="E-mail" type="email" required="required" onChange={this.handleEmailChange}
                style={{ outline: this.state.emailHasErrors ? 'red auto 1px' : '' }} />
              :
              <input className="search-form-item" placeholder="Numer telefonu" type="string" required="required" pattern="[0-9]{9}" title="np. 123123123" onChange={this.handlePhoneNumberChange}
                style={{ outline: this.state.phoneNumberHasErrors ? 'red auto 1px' : '' }} />}
            <select className="search-form-item" style={{minWidth: '170px', color: 'grey', textAlignLast: 'center'}} onChange={this.handleSearchTypeChange}>
              <option value="0">E-mail</option>
              <option value="1">Numer telefonu</option>
            </select>
            <button className="search-form-item search-form-submit-button" type="submit" disabled={this.state.stayDatesHaveErrors || this.state.numerOfGuestsHasErrors}>
              <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '1px' }} />
            </button>
          </div>
        </form>
      </div>);
  }
}