import React from 'react';
import './App.css';
import NHLScores from './NHLScores';

function MyHeading() {
  return (
    <div className='site-heading'>
      <h1>Today's Sporting Events</h1>
    </div>
  );
}

function App() {
  return (
    <>
      <MyHeading />
      <NHLScores />
    </>
  );
}

export default App;
