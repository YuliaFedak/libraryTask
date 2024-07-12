import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Library from "./pages/Library";


function App() {
  return (
      <BrowserRouter>
          <Library/>
      </BrowserRouter>
  );
}

export default App;
