import React, { Component } from 'react';
import  { Container, Row, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Col}  from 'reactstrap';
import {Link} from 'react-router-dom';

export class Layout extends Component {
  displayName = Layout.name

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
                    <NavLink href="/">Zaloguj się</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
        {this.props.children}
      </Container>
    );
  }
}
