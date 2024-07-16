// SuperAdminVideoDashboard.jsx
import React, { Component } from "react";
import SuperAdminVideoSearch from "./SuperAdminVideoSearch";
import SuperAdminVideoTable from "./SuperAdminVideoTable";

class SuperAdminVideoDashboard extends Component {
  render() {
    return (
      <div className="container-xl">
        <SuperAdminVideoTable />
      </div>
    );
  }
}

export default SuperAdminVideoDashboard;
