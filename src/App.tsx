import React from 'react';
import './App.css';
import LocalAuthority from './pages/LocalAuthorityPage';
import './tailwind.css'; 
import NavBar from './components/NavBar';

const App: React.FC = () => {
    return (
        <div className="App">
            <NavBar />
            <LocalAuthority />
        </div>
    );
};

export default App;
