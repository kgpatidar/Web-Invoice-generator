import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/:type?/:id?" element={<Invoice />} />
      </Routes>
    </div>
  );
};

export default App;
