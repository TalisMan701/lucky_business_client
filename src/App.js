import classes from "./App.module.css";
import Landing from "./Pages/Landing";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
        <Routes>
            <Route path={'/'} element={<Landing/>} />
        </Routes>

    </>
  );
}

export default App;
