import React, { Component } from 'react';
import  { Container, Row, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Col, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle}  from 'reactstrap';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginModal from './LoginModal';

Modal.setAppElement('#root');

export class Layout extends Component {
  displayName = Layout.name

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLoginModalOpen: false,
      isUserLogedIn: localStorage.getItem("token")
    };

    this.handleCloseModalClick = this.closeLoginModal.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  handleLoginClick() {
    if (this.state.isUserLogedIn){
      this.setState({isUserLogedIn: false});
      localStorage.clear();
      return;
    }

    this.setState({isLoginModalOpen: true});
  }

  handleUserLogin() {
    this.setState({isUserLogedIn: true});
    this.closeLoginModal();
  }

  closeLoginModal() {
    this.setState({isLoginModalOpen: false});
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col className="pl-0 pr-0">
            <Navbar color="light" light expand="lg">
              <NavbarBrand href="/">Pokoje u Janusza</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/rooms">Pokoje</NavLink>
                  </NavItem>
                  {!this.state.isUserLogedIn ?
                  <NavItem>
                    <NavLink onClick={this.handleLoginClick} style={{cursor: 'pointer'}}>Zaloguj się</NavLink>
                  </NavItem>
                  : <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {localStorage.getItem("userEmail").split("@")[0]}{localStorage.user} <FontAwesomeIcon icon={faUser} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Moje konto
                      </DropdownItem>
                      <DropdownItem onClick={this.handleLoginClick}>
                        Wyloguj się
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>}
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
        <LoginModal handleUserLogin={this.handleUserLogin} handleCloseModalClick={this.closeLoginModal} isOpen={this.state.isLoginModalOpen}/>
        {this.props.children}
      </Container>
    );
  }
}
