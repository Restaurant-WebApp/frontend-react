import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";




const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);  

  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });    
    
  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/external-api"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    Admin
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="mr-auto" navbar>
              <NavLink 
                  tag={RouterNavLink}
                  to="/menu"
                  exact
                  activeClassName="router-link-exact-active"> Menu </NavLink>   
            </Nav>
            <Nav className="mr-auto" navbar>
              <NavLink 
                  tag={RouterNavLink}
                  to="/reservation"
                  exact
                  activeClassName="router-link-exact-active"> Reservations </NavLink>   
            </Nav>
            <Nav className="mr-auto" navbar>
              <NavLink 
                  tag={RouterNavLink}
                  to="/review"
                  exact
                  activeClassName="router-link-exact-active"> Reviews </NavLink>   
            </Nav>
            <Nav className="mr-auto" navbar>
              <NavLink
                tag={RouterNavLink}
                to="/order"
                exact
                activeClassName="router-link-exact-active"> Orders </NavLink>   
            </Nav>            
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </Button>
                </NavItem>
                
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
          
          <Nav>
              <NavLink
                tag={RouterNavLink}
                to="/cart"
                exact
                activeClassName="router-link-exact-active">  
                <Button 
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              <div  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}>
                  <p>0</p>
              </div>
              </Button>  
              </NavLink>   
            </Nav>
                    
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
