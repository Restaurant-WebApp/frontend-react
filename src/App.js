import {React, useState} from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

import Menu from "./views/Menu";
import Order from "./views/Order";
import Reservation from "./views/Reservation";
import Review from "./views/Review";
import Cart from "./views/Cart";
import Admin from "./views/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";

initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();
  const [cartItems, setCartItems] = useState([]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const addToCart = (product) => {
    const item = {
      productId: product.productId,
      productName: product.productName,
      productImageUrl: product.productImageUrl,
      price: product.price,
    };
    setCartItems([...cartItems, item]);
  };

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
      <NavBar />
        <Container className="flex-grow-1 mt-5">          
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/menu" render={() => <Menu addToCart={addToCart} />} />            
            <Route path="/order" component={Order}/>
            <Route path="/reservation" component={Reservation}/>
            <Route path="/review" component={Review}/>
            <Route path="/cart" render={() => <Cart cartItems={cartItems} />} />
            <Route path="/Admin" component={Admin}/>
          </Switch>
        </Container>
        <Footer />
        <ToastContainer/>
      </div>
    </Router>
  );
};

export default App;
