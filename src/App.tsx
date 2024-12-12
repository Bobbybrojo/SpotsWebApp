import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Spots from "./Spots";

function App() {
  return (
    <>
      <HashRouter>
        <Provider store={store}>
          <div>
            <Routes>
              <Route path="/*" element={<Spots />} />
            </Routes>
          </div>
        </Provider>
      </HashRouter>
    </>
  );
}

export default App;
