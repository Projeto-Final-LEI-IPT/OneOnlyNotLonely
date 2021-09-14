import './App.css';
import Home from './Components/Home';
import BoxEdit from './Components/BoxEdit';
import ElderEdit from './Components/ElderEdit';
import ActEdit from './Components/ActEdit'
import InstEdit from './Components/InstEdit';
import BoxActAssign from './Components/BoxActAssign';
import Mapa from './Components/Map';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  const {isLoagind} = useAuth0

  if (isLoagind){
    return < h1>Loading ..  </h1>
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/box/:id/edit' component={BoxEdit} />
          <Route path='/elder/:id/edit' component={ElderEdit} />
          <Route path='/map' exact={true} component={Mapa} />
          <Route path='/activity/:id/edit' component={ActEdit} />
          <Route path='/institution/:id/edit' component={InstEdit}/>
          <Route path="/box/:elderid/:boxid/:boxtheme/acts" component={BoxActAssign}/>
        </Switch>
      </Router>
    </div>
  )

}
export default App;

