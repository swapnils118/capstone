import React, { Component } from "react";
import SuperAdminUserSearch from "./SuperAdminUserSearch";
import SuperAdminUserTable from "./SuperAdminUserTable";

class SuperAdminUserDashboard extends Component {
  render() {
    return (
      <div className="container-xl">
        <SuperAdminUserTable />
      </div>
    );
  }
}

export default SuperAdminUserDashboard;
