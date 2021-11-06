import 'primeicons/primeicons.css';
import 'primereact/resources/themes/md-dark-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import classes from "./App.module.css";
import Landing from "./Pages/Landing";
import {Route, Routes} from "react-router-dom";
import Auth from "./Pages/Auth";
import Registration from "./Pages/Registration";

function App() {
  return (
    <>
        <Routes>
            <Route path={'/'} element={<Landing/>} />
            <Route path={'/auth'} element={<Auth/>} />
            <Route path={'/signup'} element={<Registration/>} />
        </Routes>

    </>
  );
}

export default App;
