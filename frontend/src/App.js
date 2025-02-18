import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import OTPLogin from './components/OTPLogin';
import Welcome from './components/Welcome';

function App() {
   return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<OTPLogin />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
