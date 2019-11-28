import React, { Component } from 'react';
import  { Container, Row, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Col}  from 'reactstrap';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
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
      isUserLogedIn: false
    };

    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  handleLoginClick() {
    if (this.state.isUserLogedIn){
      this.setState({isUserLogedIn: false});
      localStorage.removeItem("token");
      return;
    }

    this.setState({isLoginModalOpen: true});
  }

  handleUserLogin() {
    this.setState({isUserLogedIn: true});
    this.handleCloseModalClick();
  }

  handleCloseModalClick() {
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
                  <NavItem>
                    <NavLink onClick={this.handleLoginClick} style={{cursor: 'pointer'}}>{this.state.isUserLogedIn ? "Wyloguj się" : "Zaloguj się"}</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
        <LoginModal handleUserLogin={this.handleUserLogin} handleCloseModalClick={this.handleCloseModalClick} isOpen={this.state.isLoginModalOpen}/>
        {this.props.children}
      </Container>
    );
  }
}
