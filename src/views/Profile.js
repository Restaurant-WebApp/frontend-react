import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { deleteUser } from "../API/APICall";
import styles from "./Home.module.css";

export const ProfileComponent = () => {
  const history = useHistory();
  
  const { user, logout } = useAuth0();
  const handleDeleteUser = async () => {
    await deleteUser(user.email);   

    await logout({ returnTo: window.location.origin });
    history.push("/success");    
  };
  
  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
      <div className="danger-section">
        <p>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
        <h3>Danger Zone</h3>
        <p>Proceed with caution. Deleting your account cannot be undone.</p>
        <button className={styles.formButton} onClick={handleDeleteUser}>
          Delete My Account
        </button>
      </div>
      
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
