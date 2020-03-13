import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from './ActionIcon';
import PulseLoader from 'react-spinners/PulseLoader';
import InformationModal from './InformationModal';
import ConfirmationModal from './ConfirmationModal';
import Axios from 'axios';

export default class UserAdministrationSection extends Component {
  displayName = UserAdministrationSection.name;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalmessage: '',
      confirmationModalData: {isOpen: false, id: ''}
    };

    this.showMessage = this.showMessage.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.openConfirmationModal = this.openConfirmationModal.bind(this);
    this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  clearMessage() {
    this.setState({modalmessage: ''});
  }

  showMessage(message) {
    this.setState({modalmessage: message});
  }

  openConfirmationModal(data) {
    this.setState({confirmationModalData: {id: data.id, isOpen: true} });
  }

  hideConfirmationModal() {
    this.setState({confirmationModalData: {isOpen: false} });
  }

  setLoading(value) {
      this.setState({loading: value});
  }

  deleteUser(id) {
    this.setLoading(true);
    this.hideConfirmationModal();

    Axios.delete("/api/user/delete", {
      headers: { Authorization: "Bearer " + localStorage.token, 'content-type': 'application/json'},
      data: '"'+ id +'"'})
      .then(() => {
        this.showMessage("Konto zostało usunięte");
        this.props.updateUsers();
      })
      .catch(() => this.showMessage("Wystąpił błąd"))
      .finally(() => this.setLoading(false));
  }

  render() {
    return (
      <Fragment>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>E-mail</th>
              <th>Numer telefonu</th>
              <th>Rola</th>
              <th>Aktywowany</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.isLoading || this.state.loading ?
                <tr>
                  <td colSpan='6'>
                    <PulseLoader
                      css={'margin: 0 auto; width: 100px; height: 10px;'}
                      sizeUnit={"px"}
                      size={14}
                      color={'#000000'}
                    />
                  </td>
                </tr> :
                this.props.data.map((x, i) =>
                  <tr key={x.id}>
                    <td>{i + 1}</td>
                    <td>{x.email}</td>
                    <td>{x.phoneNumber}</td>
                    <td>{x.role}</td>
                    <td>{x.isActivated === true ? 'Tak' : 'Nie'}</td>
                    <td><ActionIcon icon={faTimes} data={{id: x.id}} handleClick={this.openConfirmationModal} /></td>
                  </tr>
                )}
          </tbody>
        </Table>
        <InformationModal isOpen={this.state.modalmessage !== ''} message={this.state.modalmessage} handleOkay={this.clearMessage} />
        <ConfirmationModal
          isOpen={this.state.confirmationModalData.isOpen}
          message="Czy na pewno chcesz usunąć tego użytkownika?"
          data={this.state.confirmationModalData.id}
          handleYes={this.deleteUser}
          handleNo={this.hideConfirmationModal} />
      </Fragment>);
  }
}