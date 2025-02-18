import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import "./App.css";
// import Store from "./components/Store";
// import { About } from "./components/About";
// import Home from "./components/Home";

//Code Splitting components- Lazy loaded component
// const Home = lazy(() => import("./components/Home"));
const Home = lazy(() => wait(1000).then(() => import("./components/Home"))); // To check loading message
const Store = lazy(() => import("./components/Store")); // default function
const About = lazy(() =>
  import("./components/About").then((module) => {
    return { default: module.About };
  })
); //named function. need to fix the error because of naming func

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavWrapper />}>
          <Route index element={<Home />} />
          <Route path="store" element={<Store />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

function NavWrapper() {
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/about">About</Link>
      </nav>
      {/* Wrap Outlet with Suspense */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
export default App;
