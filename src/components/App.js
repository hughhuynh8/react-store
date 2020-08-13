import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import PDP from './PDP';
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Orders = lazy(() => import("./Orders"));
const ErrorPage = lazy(() => import("./ErrorPage"));

class App extends React.Component {
    
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Header/>
                        <div className="ui main container">
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/about" component={About} />
                                <Route path="/orders" component={Orders} />
                                <Route path="/product/:id" exact component={PDP} />
                                <Route path="/" component={ErrorPage} />
                            </Switch>
                        </div>
                    </Suspense>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;