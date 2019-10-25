import React, { Component } from 'react';
import './Extensions';
import { Redirect } from 'react-router-dom'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-day-picker/lib/style.css';
import './styles/RoomSearch.css';
import LocalizedDatePicker from './LocalizedDatePicker';

export default class RoomSearch extends Component {
  displayName = RoomSearch.name;

  constructor(props) {
    super(props);

    this.state = {
      stayStart: new Date(0, 0, 1),
      stayEnd: new Date(0, 0, 1),
      numerOfGuests: 0,
      stayDatesHaveErrors: false,
      numerOfGuestsHasErrors: false,
      redirect: false
    }

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleNumerOfGuestsChange = this.handleNumerOfGuestsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate () {
    if (this.state.redirect) {
        this.setState({redirect: false})
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({redirect: true})
  }

  handleStartDateChange(day, { disabled }) {
    if (disabled)
      return;

    this.validateStayDates(day, this.state.stayEnd)
    this.setState({ stayStart: day });
  }

  handleEndDateChange(day, { disabled }) {
    if (disabled)
      return;

    this.validateStayDates(this.state.stayStart, day)
    this.setState({ stayEnd: day });
  }

  handleNumerOfGuestsChange(event) {
    if (event.target.value > 10) {
      this.setState({ numerOfGuestsHasErrors: true });
      return;
    }

    this.setState({ numerOfGuestsHasErrors: false, numerOfGuests: event.target.value });
  }

  validateStayDates(startDate, endDate) {
    if (startDate.getTime() !== new Date(0, 0, 1).getTime()
      && endDate.getTime() !== new Date(0, 0, 1).getTime()
      &&
      (this.daysDifference(endDate, startDate) > 30
        || startDate > endDate
        || this.daysDifference(startDate, new Date()) > 365
        || startDate.getTime() === endDate.getTime())) {
      this.setState({ stayDatesHaveErrors: true });
      return;
    }

    this.setState({ stayDatesHaveErrors: false });
  }

  daysDifference(firstDate, secondDate) {
    let oneDay = 86400000; //day in ms
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
  }

  render() {
    if(this.state.redirect){
      this.setState({redirect: false})
      return <Redirect 
        to={`/rooms/search/stayStart/${this.state.stayStart.ddmmyyyy()}/stayEnd/${this.state.stayEnd.ddmmyyyy()}/guests/${this.state.numerOfGuests}`} />
    }
    return (
      <div className="room-search-form">
        <form onSubmit={this.handleSubmit}>
          <div className="room-search-form-content">
            <LocalizedDatePicker
              placeholder='Przyjazd'
              onChange={this.handleStartDateChange}
              hasErrors={this.state.stayDatesHaveErrors}
              disabledDays={(day) => day < new Date().setHours(0,0,0,0)} />
            <LocalizedDatePicker
              placeholder='Wyjazd'
              onChange={this.handleEndDateChange}
              hasErrors={this.state.stayDatesHaveErrors}
              stayStart={this.state.stayStart}
              disabledDays={(day) => day < new Date().setHours(0,0,0,0) || day <= this.state.stayStart} />

            <input className="search-form-item" placeholder="Liczba gości " type="number" min="1" step="1" required="required" onChange={this.handleNumerOfGuestsChange}
              style={{ outline: this.state.numerOfGuestsHasErrors ? 'red auto 1px' : '' }} />
            <button className="search-form-item search-form-submit-button" type="submit" disabled={this.state.stayDatesHaveErrors || this.state.numerOfGuestsHasErrors}>
              <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '1px' }} />
            </button>
          </div>
        </form>
      </div>
    );
  }
}