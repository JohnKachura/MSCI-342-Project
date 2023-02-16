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

import TextField from "@material-ui/core/TextField";
import { ListItem, ListItemText } from "@material-ui/core";
import List from "@mui/material/List";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SearchIcon from '@mui/icons-material/Search';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


//Dev mode
const serverURL = ""; //enable for dev mode

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#000000",
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = (theme) => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(5),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
  },
});

class Searchs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
    };
  }
  componentDidMount() {
    //this.loadUserSettings();
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Search />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

Searchs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SearchTab = (event) => {
  console.log("Search Button is clicked");
  history.push("/Search");
};

const Reviews = (event) => {
  console.log("Reviews Button is clicked");
  history.push("/Reviews");
};

const myPage = (event) => {
  console.log("myPage Button is clicked");
  history.push("/myPage");
};

const land = (event) => {
  console.log("land Button is clicked");
  history.push("/");
};

//--------------------------------------------------------------------------------

const Search = () => {

  const [actorImage, setActorImage] = React.useState("");

  const selectedActorImage = (event) => {
    setActorImage(event.target.value);
    console.log("Actor that was picked", actorImage);
  };

  React.useEffect(() => {
    getActors();
  }, []);

  const [actors, setActors] = React.useState([]);

  const getActors = () => {
    callApiGetActors().then((res) => {
      console.log("callApiLoadActors returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("callApiLoadActors parsed: ", parsed);
      setActors(parsed);
    });
  };

  const callApiGetActors = async () => {
    const url = serverURL + "/api/getActors";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Genres: ", body);
    return body;
  };

  return (
    <Box sx={{ flexGrow: 2 }} style={{ height: '100vh'}}>
      <AppBar position="static" sx={{ bgcolor: "purple" }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            RoadRunner &nbsp; <DirectionsRunIcon></DirectionsRunIcon>
          </Typography>
          <p class="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={land}
          >
            <LiveTvIcon />
          </IconButton> */}

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button color="inherit" onClick={SearchTab}>
              Home &nbsp;&nbsp; <HomeIcon></HomeIcon>
            </Button>
            <Button color="inherit" onClick={Reviews}>
              Profile &nbsp;&nbsp; <AccountBoxIcon></AccountBoxIcon>
            </Button>
            <Button color="inherit" onClick={myPage}>
              Add &nbsp;&nbsp; <AddIcon></AddIcon>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Typography
        variant="h5"
        component="div"
        justify="flex-start"
        sx={{ flexGrow: 1 }}
        fontFamily="Monospace"
      >
        <p></p>
        &nbsp;&nbsp; Choose an one of my favourites Actor/Actress to see what they look like!
        <p></p>
      </Typography>

      {/* -------------------- Real code starts*/}
      <Grid
        container
        spacing={2}
        direction="column"
        justify="flex-start"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <FormControl style={{minWidth: 400}}>
          <InputLabel id="select-movie">Select Actor</InputLabel>
          <Select
            labelId="select-actor"
            id="simple-select-actor"
            onChange={selectedActorImage}
            style={{minHeight: '8vh', minWidth: '15vh'}}
          >
            {actors.map((actor, index) => (
              <MenuItem key={actor.first_name + " " + actor.last_name} value={actor.image_link}>
                {actor.first_name + " " + actor.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <img src={actorImage} height = "400"/>

      </Grid>
    </Box>
  );
};

export default withStyles(styles)(Searchs);
