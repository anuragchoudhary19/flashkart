import React from 'react';
import SignupComplete from './Auth/SignupComplete/SignupComplete';
import { Route } from 'react-router-dom';
import Header from './Header/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Route exact path='/signup/complete' component={SignupComplete} />
    </div>
  );
}

export default App;
