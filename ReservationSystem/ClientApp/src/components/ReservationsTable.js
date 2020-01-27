import React, { Component } from 'react';
import {Table} from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ActionIcon from './ActionIcon';
import PulseLoader from 'react-spinners/PulseLoader';


export default class ReservationTable extends Component {
  displayName = ReservationTable.name;

  renderCancelButton = x => x.status === 'Anulowane' ? '' : <ActionIcon icon={faTimes} itemId={x.id} handleClick={this.props.handleDelete}/>;

  render() {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nazwa</th>
            <th>Początek pobutu</th>
            <th>Koniec pobytu</th>
            <th>Cena</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.isLoading ?
              <tr>
                <td colSpan='7'>
                  <PulseLoader
                    css={'margin: 0 auto; width: 100px; height: 10px;'}
                    sizeUnit={"px"}
                    size={14}
                    color={'#000000'}
                  />
                </td>
              </tr> :
              this.props.data.map((x, i) =>
                <tr>
                  <td>{i + 1}</td>
                  <td>{x.roomName}</td>
                  <td>{x.startDate.split('T')[0]}</td>
                  <td>{x.endDate.split('T')[0]}</td>
                  <td>{x.price}</td>
                  <td>{x.status}</td>
                  <td>{this.renderCancelButton(x)}</td>
                </tr>
              )}
        </tbody>
      </Table>);
  }
}