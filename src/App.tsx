import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Layout/Home/index";
import CategoryList from "./Layout/Category/List";
import MemberList from "./Layout/Member/List";

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
