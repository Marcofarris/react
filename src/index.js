import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fondo from "./Pages/Fondo";
import Progetti from "./Pages/Progetti";
import Layout from "./Pages/Layout";
import React, { useState } from 'react';
import Gioco from './Pages/Gioco';
import BG from './Pages/BG';


export default function App() {
  const [images, setImages] = useState([]);

  function addFile(name) {
      setImages([...images, name]);
      console.log(images)
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="fondo" element={<Fondo/>} />
        <Route path="progetti" element={<Progetti/>} />
        <Route path="gioco" element={<Gioco/>} />
        <Route path="bg" element={<BG/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
