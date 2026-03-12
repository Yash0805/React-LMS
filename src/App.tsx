import { BrowserRouter, Routes , Route} from "react-router-dom";
import "./App.css";
import CategoryList from "./components/CategoryList";
import MemberList from "./components/MemberList";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/CategoryList" element={<CategoryList/>}/>
      <Route path="/MemberList" element={<MemberList/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
