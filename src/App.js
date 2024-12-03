import React from "react";
import Student from "./Routes/Student";
import Home from "./Routes/Home";
import EditStudent from "./Routes/EditStudent";
import NotFound from "./Routes/NotFound";
import AddStudent from "./Routes/AddStudent";
import { Routes, Route } from "react-router-dom";

// TODO: answer here

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add" element={<AddStudent />} />
        <Route path="*" element={<NotFound />} />
        <Route path="student">
          <Route index element={<Student />} />
          <Route path=":id" element={<EditStudent />} />
          <Route index element={<EditStudent />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
