import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CategoryList from "./Feature/Category/List"
import MemberList from "./Feature/Member/List";
import Home from "./Layout/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CategoryList" element={<CategoryList />} />
          <Route path="/MemberList" element={<MemberList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
