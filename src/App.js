import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import StateItemDetails from './components/StateItemDetails'
import About from './components/About'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:id" component={StateItemDetails} />
    <Route exact path="/about" component={About} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
