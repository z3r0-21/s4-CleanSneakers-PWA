import ReactDOM from 'react-dom';  
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import './index.css';  
import App from './App';  
import Manually from './AddManually'
  
const routing = (  
  <Router>  
    <div>  
      <h1>React Router Example</h1>  
      <Route exact path="/" component={App} />  
      <Route path="/manually" component={Manually} />  
    </div>  
  </Router>  
)  
ReactDOM.render(routing, document.getElementById('root'));  
root.render(<App />);