import React from 'react';
import Header from './components/Header.js';
import MainPage from './components/MainPage.js';
import Footer from './components/Footer.js';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}
