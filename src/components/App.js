import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import history from '../History';
import PDP from './PDP';
import Checkout from "./Checkout";
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Orders = lazy(() => import("./Orders"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const GlobalMessage = lazy(() => import("./GlobalMessage"));

class App extends React.Component {
    
    render() {
        return (
            <div className="pushable">
                <Router history={history}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Header/>
                        <GlobalMessage />
                        <div className="pusher" id="pusher">
                            <div className="ui main container">
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/about" component={About} />
                                    <Route path="/orders" component={Orders} />
                                    <Route path="/checkout" component={Checkout} />
                                    <Route path="/product/:id" exact component={PDP} />
                                    <Route path="/" component={ErrorPage} />
                                </Switch>
                            </div>
                        </div>
                    </Suspense>
                </Router>
            </div>
        );
    }
}

export default App;