import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/register' component={RegisterScreen} exact />
      </main>
    </Router>
  );
}

export default App;
