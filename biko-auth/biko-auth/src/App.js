import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginFormPage from "./pages/login_form_page";
import MachinesListPage from "./pages/machine_list_page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginFormPage />} />
        <Route path="/machines" element={<MachinesListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>);
