import React from 'react';
import './App.css';
import LocalAuthority from './pages/LocalAuthorityPage';
import './tailwind.css'; 

const App: React.FC = () => {
    return (
        <div className="App">
            <LocalAuthority />
        </div>
    );
};

export default App;
