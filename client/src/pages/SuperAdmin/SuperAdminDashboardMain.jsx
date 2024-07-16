import React, { Component } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SuperAdminUserDashboard from "./SuperAdminUserDashboard";
import SuperAdminVideoDashboard from "./SuperAdminVideoDashboard";

const Container = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;

class SuperAdminDashboardMain extends Component {
  constructor() {
    super();
    this.state = {
      name: "Super Admin Dashboard",
      tabIndex: 0,
    };
  }

  // Lifecycle method called after the component is mounted
  async componentDidMount() {}

  handleTabSelect = (index) => {
    this.setState({ tabIndex: index });
  };

  // Rendering the component
  render() {
    return (
      <Container className="container-xl">
        <h1>Select which data you want to view or modify</h1>
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={this.handleTabSelect}
        >
          <TabList>
            <Tab>User Dashboard</Tab>
            <Tab>Video Dashboard</Tab>
          </TabList>

          <TabPanel>
            <SuperAdminUserDashboard />
          </TabPanel>
          <TabPanel>
            <SuperAdminVideoDashboard />
          </TabPanel>
        </Tabs>
      </Container>
    );
  }
}

// Exporting the component
export default SuperAdminDashboardMain;
