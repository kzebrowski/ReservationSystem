import React, { Component, ReactDOM } from 'react';
import Modal from 'react-modal';
import './styles/Modal.css'
import './styles/SearchForm.css';
import Axios from 'axios';
import Loader from './Loader';
import { nodeModuleNameResolver } from 'typescript';

export default class StatusChangeModal extends Component {
  displayName = StatusChangeModal.name;

  constructor(props) {
    super(props);

    this.state = { newstatus: 4, loading: false};  

    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStatusChange(event) {
    let value = event.target.value;

    this.setState({ newstatus: value});
  }

  handleSubmit() {
    if (this.state.newstatus === 4)
      return;
    
    this.setState({loading: true});
    
    Axios.post('api/reservations/changestatus',
    {
      reservationId: this.props.reservationId,
      status: this.state.newstatus
    },    
    { headers: { Authorization: "Bearer " + localStorage.token }})
    .then(() => this.props.closeModal())
    .catch(e => alert(e))
    .finally(() => this.setState({loading: false}));
  }

  populateSelect() {
    var reservationStatuses = 
      [{ name: 'Oczekujące', code: 0 },
       { name: 'W trakcie', code: 1 },
       { name: 'Zakończone', code: 2 },
       { name: 'Anulowane', code: 3 }];
    var options = [<option value={4} disabled>------ Wybierz ------</option>];

    reservationStatuses.forEach(status => {
      if (status.name !== this.props.currentStatus) {
        options.push(
          <option value={status.code}>{status.name}</option>
        )
      }
    });

    return options;
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} className="centered-modal status-change-modal p-2">
        <Loader isLoading={this.props.loading} />
        <h3>Zmień status</h3>
        <b>Aktualny status: {this.props.currentStatus}</b>
        <div>Zmień na:</div>
        <div>
          <select
            className="search-form-item"
            style={{width: '100%'}}
            onChange={this.handleStatusChange}
            defaultValue={4}
            value={this.state.newstatus}>
            {this.populateSelect()}
          </select>
          <button className="generic-submit-button-dark mt-2" onClick={this.handleSubmit}>Zmień</button>
          <button className="generic-submit-button-light" onClick={this.props.closeModal}>Anuluj</button>
        </div>
      </Modal>
    );
  }
}