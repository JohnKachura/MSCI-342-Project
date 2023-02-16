// import React from "react";
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import history from "../Navigation/history";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@material-ui/core/Grid";

//Selects imports
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//Dev mode
const serverURL = ""; //enable for dev mode

// const SearchTab = (event) => {
//   console.log("Search Button is clicked");
//   history.push("/Search");
// };

// const Reviews = (event) => {
//   console.log("Reviews Button is clicked");
//   history.push("/Reviews");
// };

// const myPageTab = (event) => {
//   console.log("myPage Button is clicked");
//   history.push("/myPage");
// };

// const land = (event) => {
//   console.log("land Button is clicked");
//   history.push("/");
// };

//----------------------------------------------------

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const myPage = () => {

  const SearchTab = (event) => {
    console.log("Search Button is clicked");
    history.push("/Search");
  };
  
  const Reviews = (event) => {
    console.log("Reviews Button is clicked");
    history.push("/Reviews");
  };
  
  const myPageTab = (event) => {
    console.log("myPage Button is clicked");
    history.push("/myPage");
  };
  
  const land = (event) => {
    console.log("land Button is clicked");
    history.push("/");
  };

  // const [genre, setGenre] = React.useState("");

  // const selectedGenre = (event) => {
  //   setGenre(event.target.value);
  //   console.log("genre that was picked", genre);
  // };

  // React.useEffect(() => {
  //   getGenres();
  // }, []);
  
  // const [genres, setGenres] = React.useState([]);
  
  // const getGenres = () => {
  //   callApiGetGenres().then((res) => {
  //     console.log("callApiLoadGenres returned: ", res);
  //     var parsed = JSON.parse(res.express);
  //     console.log("callApiLoadGenres parsed: ", parsed);
  //     setGenres(parsed);
  //   });
  // };
  
  // const callApiGetGenres = async () => {
  //   const url = serverURL + "/api/getGenres";
  //   console.log(url);
  
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   console.log("Genres: ", body);
  //   return body;
  // };


  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            MGMT Movie Reviews
          </Typography>
          <p class="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={land}
          >
            <LiveTvIcon />
          </IconButton>

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button color="inherit" onClick={SearchTab}>
              Search
            </Button>
            <Button color="inherit" onClick={Reviews}>
              Reviews
            </Button>
            <Button color="inherit" onClick={myPageTab}>
              MyPage
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Typography
        variant="h7"
        component="div"
        justify="flex-start"
        sx={{ flexGrow: 1 }}
        fontFamily="Monospace"
      >
        <p></p>
        &nbsp;&nbsp; Please select a Genre to see movies related to the pick!
        <hr></hr>
      </Typography>

      <Grid
        container
        spacing={2}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: "80vh" }}
      >

        <Grid item>
          <FormControl halfWidth>
            <InputLabel id="select-genre">Select Movie</InputLabel>
            <Select
              labelId="select-genre"
              id="simple-select-genre"
              // onChange={selectedGenre}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

      </Grid>
    </Box>
  );
};

export default myPage;
