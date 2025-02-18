import { useState, lazy, Suspense } from "react";
// import { AdminData } from "./AdminData";
// import {sum} from "../sum"

const AdminData = lazy(() =>
  import("./AdminData").then((module) => {
    return { default: module.AdminData };
  })
);

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <h1>Home</h1>
      <button
        onClick={() => {
          //Code splitting a function
          import("../sum.js").then((module) => {
            alert(module.sum(2, 2));
          });
        }}
      >
        Add 2 + 2
      </button>
      <br />
      <br />
      <button onClick={() => setIsAdmin((prev) => !prev)}>Toggle Admin</button>
      <Suspense fallback={<h2>Loading...</h2>}>
        {isAdmin ? <AdminData /> : <h2>Not Admin</h2>}
      </Suspense>
    </>
  );
}
