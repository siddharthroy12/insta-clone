import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Route path='/' component={HomeScreen} exact></Route>
      </main>
    </Router>
  );
}

export default App;
