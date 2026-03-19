import { Navigate, Route, Routes } from "react-router";
import List from "./Pages/List";
import Create from "./Pages/Create";


export default function Category() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" />} />
      <Route path="list" element={<List />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
}