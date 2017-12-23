import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import People from './PeopleContainer';
import Error from './ErrorContainer';
import NotFound from './NotFoundContainer';


const App = () => (
  <div>
    <Switch>
      <Route path="/people" component={People}/>
      <Route path="/notfound" component={NotFound}/>
      <Route path="/" component={Error}/>
    </Switch>
  </div>  
)

export default App;
