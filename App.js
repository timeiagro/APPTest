import React from 'react';

import Routes from './src/routes';

import { DataProvider } from './src/contexts'

function App() {
    return (
        <DataProvider>
            <Routes />
        </DataProvider>        
    );
};

export default App;
