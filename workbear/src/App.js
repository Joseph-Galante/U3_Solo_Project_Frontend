//=============== SETUP ===============//

// react

// react router
import { Route } from 'react-router-dom';

// pages
import Home from './pages/Home';

// components
import NavBar from './components/NavBar';

//=============== APP ===============//

function App() {


  return (
    <div className="App">
      <NavBar />

      <Route exact path="/" render={() => <Home />} />
    </div>
  );
}

export default App;
