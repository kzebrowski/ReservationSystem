import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/RoomSearch.css';
import 'react-day-picker/lib/style.css';

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
      stayStart: new Date(),
      stayEnd: new Date(),
      numerOfGuests: 0,
      stayStartHasErrors: false,
      stayEndHasErrors: false,
      numerOfGuestsHasErrors: false
    }
  }
  
  render() {
    //probably should refactor to wrapper class
    let daysLong = this.WEEKDAYS_LONG;
    let months = this.months;
    let daysShort = this.WEEKDAYS_SHORT;

    return (
      <div className="room-search-form">
        <form>
          <div className="room-search-form-content">
            <DayPickerInput
              inputProps={{
                className: 'search-form-item'
              }}
              placeholder="Przyjazd"
              dayPickerProps={{
                firstDayOfWeek: 1,
                months: this.MONTHS,
                weekdaysLong: this.WEEKDAYS_LONG,
                weekdaysShort: this.WEEKDAYS_SHORT
              }} />

            <DayPickerInput
              inputProps={{
                className: 'search-form-item'
              }}
              placeholder="Wyjazd"
              dayPickerProps={{
                firstDayOfWeek: 1,
                months: this.MONTHS,
                weekdaysLong: this.WEEKDAYS_LONG,
                weekdaysShort: this.WEEKDAYS_SHORT
              }} />

              <input className="search-form-item " placeholder="Liczba gości " />
              <button className="search-form-item search-form-submit-button" type="submit">
                <FontAwesomeIcon icon={faSearch} style={{marginLeft: '1px'}}/>
              </button>
            </div>
        </form>
      </div>
    );
  }
}