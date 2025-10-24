import React from 'react';
import Header from './components/Header.js';
import MainPage from './components/MainPage.js';
import Footer from './components/Footer.js';
import './App.css'


/* TODO : 

1. Correct RESET button
2. Add reset wingspan markers button
3. Add warnings and pitfalls
4. User guide
5. User video
6. Maths explaining document
7. Better uncertainity values
8. Add more birds
9. 'Upload image to begin' should be clickable when no image is selected

*/




export default function App() {
  return (
    <div className="app-container">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}
