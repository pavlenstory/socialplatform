import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App(){
    return (
        <Router>
            <Routes>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
            </Routes>
        </Router>
    )
}

export default App;