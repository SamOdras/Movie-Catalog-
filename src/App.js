import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy, Suspense } from 'react';
import { Switch, Router, Route } from "react-router-dom";
import history from "./history";
import Spinner from "./components/spinner/spinner.component";
import Frame from './components/frame/frame.container';

const MainPage = lazy(() => import("./pages/main-page/main-page.container"))
const DetailPage = lazy(() => import("./pages/detail-page/detail-page.container"));

const App = () => {

  const FrameLayout = (Component, props) => {
    return (
      <Frame {...props}>
        <Component {...props} />
      </Frame>
    );
  };
  return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            path="/"
            exact
            render={props => FrameLayout(MainPage, props)}
          />
          <Route
            path="/detail"
            exact
            render={props => FrameLayout(DetailPage, props)}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
