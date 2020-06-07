import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class LocalizedDatePicker extends Component {
  displayName = LocalizedDatePicker.name;
  MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  WEEKDAYS_LONG = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  WEEKDAYS_SHORT = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'N'];
  modifiers = {};

  constructor(props) {
    super(props);

    if (this.props.stayStart){
      this.modifiers = {highlighted: this.props.stayStart}
    }
  }

  render() {
    return (
      <DayPickerInput
              inputProps={{
                className: 'search-form-item search-form-date-input',
                style: {outline: this.props.hasErrors ? 'red auto 1px' : '', caretColor: 'transparent'},
                required:'required',
                onKeyDown: (event) => event.preventDefault()
              }}
              placeholder = {this.props.placeholder}
              value = {this.props.value}
              dayPickerProps={{
                modifiers: {
                  highlighted: this.props.stayStart
                },
                firstDayOfWeek: 1,
                months: this.MONTHS,
                weekdaysLong: this.WEEKDAYS_LONG,
                weekdaysShort: this.WEEKDAYS_SHORT,
                onDayClick: this.props.onChange,
                disabledDays: this.props.disabledDays
              }} />
    );
  }
}