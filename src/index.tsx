import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import EditorialApp from "./EditorialApp";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: EditorialApp,
  errorBoundary(err: Error, info: any, props: any) {
    return (
      <div className="card" style={{ color: 'red' }}>
        <h3>Error in React Editorial MFE</h3>
        <p>{err.message}</p>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
