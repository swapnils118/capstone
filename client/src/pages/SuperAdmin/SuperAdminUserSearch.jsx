import React, { Component } from "react";
import { Button, TextField, Grid } from "@mui/material";

class SuperAdminUserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleInputChange = (e) => {
    const searchText = e.target.value;
    this.setState({ searchText });
    this.props.onSearch(searchText);
  };

  handleSearch = () => {
    const { searchText } = this.state;
    this.props.onSearch(searchText);
  };

  render() {
    return (
      <div className="mt-5">
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            marginY: 2,
            padding: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Grid item xs={10}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search users by name..."
              value={this.state.searchText}
              onChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSearch}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SuperAdminUserSearch;
