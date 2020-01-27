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

    this.closeLoginModal = this.closeLoginModal.bind(this);
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
      <Container fluid={true} className="pb-3">
        <Row>
          <Col className="pl-0 pr-0">
            <Navbar color="light" light expand="lg">
              <NavbarBrand href="/">Pokoje u Janusza</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/admin" className="pointer">Administracja</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/rooms" className="pointer">Pokoje</NavLink>
                  </NavItem>
                  {!this.state.isUserLogedIn ?
                  <NavItem>
                    <NavLink onClick={this.handleLoginClick} className="pointer">Zaloguj się</NavLink>
                  </NavItem>
                  : <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="pointer">
                      {localStorage.getItem("userEmail").split("@")[0]}{localStorage.user} <FontAwesomeIcon icon={faUser} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink className="fc-b" tag={Link} to="/myaccount">Moje konto</NavLink>
                      </DropdownItem>
                      <DropdownItem onClick={this.handleLoginClick}>
                        <NavLink className="fc-b" >Wyloguj się</NavLink>
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
