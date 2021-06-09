import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './App';
import addBox from './addBox';
import boxList from './boxList';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Switch>
            <Route component={boxList} path="/" exact={true} />
            <Route component={addBox} path="/add" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;