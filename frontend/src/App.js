import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProfileUpdateScreen from './screens/ProfileUpdateScreen'
import PostScreen from './screens/PostScreen'

function App() {
  return (
    <Router>
      <Header />
      <main style={{paddingTop:"100px", marginBottom:"30px"}}>
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/register' component={RegisterScreen} exact />
        <Route path='/updateprofile/:id' component={ProfileUpdateScreen} exact />
        <Route path='/profile/:id' component={ProfileScreen} exact />
        <Route path='/profile' component={ProfileScreen} exact />
        <Route path='/post/:id' component={PostScreen} exact />
        <Route path='/' component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
