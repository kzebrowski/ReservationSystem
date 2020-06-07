import React, { Component } from 'react';
import './Extensions';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-day-picker/lib/style.css';
import './styles/RoomSearch.css';
import './styles/SearchForm.css';
import LocalizedDatePicker from './LocalizedDatePicker';
import history from '../history';

export default class RoomSearch extends Component {
  displayName = RoomSearch.name;

  constructor(props) {
    super(props);

    this.state = {
      stayStart: props.stayStart ? new Date(props.stayStart) : new Date(0, 0, 1),
      stayEnd: props.stayEnd ? new Date(props.stayEnd) : new Date(0, 0, 1),
      numerOfGuests: props.numberOfGuests ? parseInt(props.numberOfGuests, 10) : 0,
      stayDatesHaveErrors: false,
      numerOfGuestsHasErrors: false
    }

    console.log(props);
    console.log(this.state);

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleNumerOfGuestsChange = this.handleNumerOfGuestsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValueDate = (date) => date.getTime() === new Date(0, 0, 1).getTime() ? null : date;

  handleSubmit(event) {
    event.preventDefault();

    history.push(`/rooms/search/stayStart/${this.state.stayStart.yyyymmdd()}/stayEnd/${this.state.stayEnd.yyyymmdd()}/guests/${this.state.numerOfGuests}`);
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
    return (
      <div className="search-form">
        <form onSubmit={this.handleSubmit}>
          <div className="search-form-content">
            <LocalizedDatePicker
              placeholder='Przyjazd'
              value={this.getValueDate(this.state.stayStart)}
              onChange={this.handleStartDateChange}
              hasErrors={this.state.stayDatesHaveErrors}
              disabledDays={(day) => day < new Date().setHours(0,0,0,0)} />
            <LocalizedDatePicker
              placeholder='Wyjazd'
              value={this.getValueDate(this.state.stayEnd)}
              onChange={this.handleEndDateChange}
              hasErrors={this.state.stayDatesHaveErrors}
              stayStart={this.state.stayStart}
              disabledDays={(day) => day < new Date().setHours(0,0,0,0) || day <= this.state.stayStart} />

            <input
              className="search-form-item"
              placeholder="Liczba gości"
              type="number"
              min="1"
              step="1"
              required="required"
              onChange={this.handleNumerOfGuestsChange}
              style={{ outline: this.state.numerOfGuestsHasErrors ? 'red auto 1px' : '' }}
              value={this.props.numberOfGuests}/>
            <button className="search-form-item search-form-submit-button" type="submit" disabled={this.state.stayDatesHaveErrors || this.state.numerOfGuestsHasErrors}>
              <FontAwesomeIcon icon={faSearch} style={{ marginLeft: '1px' }} />
            </button>
          </div>
        </form>
      </div>
    );
  }
}