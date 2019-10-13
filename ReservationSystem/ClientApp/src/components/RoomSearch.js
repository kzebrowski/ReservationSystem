import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-day-picker/lib/style.css';
import './styles/RoomSearch.css';

export default class RoomSearch extends Component {
  displayName = RoomSearch.name;

  MONTHS = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];

  WEEKDAYS_LONG = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ];

  WEEKDAYS_SHORT = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'N'];

  constructor(props) {
    super(props);

    this.state = {
      stayStart: new Date(0, 0, 1),
      stayEnd: new Date(0, 0, 1),
      numerOfGuests: 0,
      stayDatesHaveErrors: false,
      numerOfGuestsHasErrors: false
    }

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleNumerOfGuestsChange = this.handleNumerOfGuestsChange.bind(this);
  }

  handleStartDateChange(day, {disabled}) {
    if (disabled)
      return;

    this.validateStayDates(day, this.state.stayEnd)
    this.setState({stayStart: day});
  }

  handleEndDateChange(day, {disabled}) {
    if (disabled)
      return;

    this.validateStayDates(this.state.stayStart, day)
    this.setState({stayEnd: day});
  }

  handleNumerOfGuestsChange(event) {
    if (event.target.value > 10) {
      this.setState({numerOfGuestsHasErrors: true});
      return;
    }

    this.setState({numerOfGuestsHasErrors: false, numerOfGuests: event.target.value});
  }

  validateStayDates(startDate, endDate) {
    if (startDate.getTime() !== new Date(0, 0, 1).getTime() 
        && endDate.getTime() !== new Date(0, 0, 1).getTime()
        && 
        (this.daysDifference(endDate, startDate) > 30
        || startDate > endDate
        || this.daysDifference(startDate, new Date()) > 365
        || startDate.getTime() === endDate.getTime())) 
    {
      this.setState({stayDatesHaveErrors: true});
      return;
    }

    this.setState({stayDatesHaveErrors: false});
  }

  daysDifference(firstDate, secondDate) {
    let oneDay = 86400000; //day in ms
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
  }
  
  render() {
    //probably should be refactored to wrapper component

    return (
      <div className="room-search-form">
        <form>
          <div className="room-search-form-content">
            <DayPickerInput
              inputProps={{
                className: 'search-form-item search-form-date-input',
                style: {outline: this.state.stayDatesHaveErrors ? 'red auto 1px' : '', caretColor: 'transparent'},
                required:'required',
                onKeyDown: (event) => event.preventDefault()
              }}
              placeholder="Przyjazd"
              dayPickerProps={{
                firstDayOfWeek: 1,
                months: this.MONTHS,
                weekdaysLong: this.WEEKDAYS_LONG,
                weekdaysShort: this.WEEKDAYS_SHORT,
                onDayClick: this.handleStartDateChange,
                disabledDays: (day) => day < new Date()
              }} />

            <DayPickerInput
              inputProps={{
                className: 'search-form-item search-form-date-input',
                style: {outline: this.state.stayDatesHaveErrors ? 'red auto 1px' : '', caretColor: 'transparent'},
                required:'required',
                onKeyDown: (event) => event.preventDefault()
              }}
              placeholder="Wyjazd"
              dayPickerProps={{
                modifiers: {
                  highlighted: this.state.stayStart
                },
                firstDayOfWeek: 1,
                months: this.MONTHS,
                weekdaysLong: this.WEEKDAYS_LONG,
                weekdaysShort: this.WEEKDAYS_SHORT,
                onDayClick: this.handleEndDateChange,
                disabledDays: (day) => day < new Date() || day < this.state.stayStart
              }} />

              <input className="search-form-item" placeholder="Liczba gości " type="number" min="1" step="1" required="required" onChange={this.handleNumerOfGuestsChange}
                style={{outline: this.state.numerOfGuestsHasErrors ? 'red auto 1px' : ''}} />
              <button className="search-form-item search-form-submit-button" type="submit" disabled={this.state.stayDatesHaveErrors || this.state.numerOfGuestsHasErrors}>
                <FontAwesomeIcon icon={faSearch} style={{marginLeft: '1px'}}/>
              </button>
            </div>
        </form>
      </div>
    );
  }
}