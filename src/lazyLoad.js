import { lazy } from "react";
// Named function to default function
export default function lazyLoad(path, namedExport) {
  return lazy(() => {
    const promise =  import(path);
    if (namedExport == null) {
      return promise;
    } else {
      return promise.then((module) => ({ default: module[namedExport] }));
    }
  });
}

lazyLoad("./components/About" , "About")