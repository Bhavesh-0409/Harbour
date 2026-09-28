import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Intake from "@/pages/Intake";
import Result from "@/pages/Result";
import Crisis from "@/pages/Crisis";
import Staff from "@/pages/Staff";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/intake" element={<Intake />} />
      <Route path="/route/:id" element={<Result />} />
      <Route path="/now/:id" element={<Crisis />} />
      <Route path="/staff" element={<Staff />} />
    </Routes>
  );
}
