import ReactDOM from "react-dom/client";
import {Route, Routes} from "react-router-dom";
import LoginFormPage from "./pages/login_form_page";
import MachinesListPage from "./pages/machine_list_page";
import {Toaster} from 'react-hot-toast';
// import RegisterFormPage from "./pages/register_form_page";

function App() {
  return (
 <>
    <Toaster position='top-right'/>
      <Routes>
        <Route path="/auth" element={<LoginFormPage />} />
        <Route path="/machines" element={<MachinesListPage />} />
        {/* <Route path="/register" element={<RegisterFormPage />} /> */}
      </Routes>
      </>
  );
}

export default App;
