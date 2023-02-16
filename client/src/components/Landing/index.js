import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import history from "../Navigation/history";


import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";


import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
// import LiveTvIcon from '@mui/icons-material/LiveTv';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


const Search = (event) => {
  console.log("Search Button is clicked");
  history.push('/Search')
};

const Reviews = (event) => {
  console.log("Reviews Button is clicked");
  history.push('/Reviews')
};

const myPage2 = (event) => {
  console.log("myPage Button is clicked");
  history.push('/myPage')
};

const land = (event) => {
  console.log("land Button is clicked");
  history.push('/')
};

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

class Landings extends Component {
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
            <Landing />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

Landings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Landing = () => {
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

          <Stack direction="row"
                 divider={<Divider orientation="vertical" flexItem />}
                 spacing={2}>

          <Button  color="inherit" onClick={Search}>
              Home &nbsp;&nbsp; <HomeIcon></HomeIcon>
              </Button>
          <Button  color="inherit" onClick={Reviews}>
              Profile &nbsp;&nbsp; <AccountBoxIcon></AccountBoxIcon>
            </Button>
          <Button  color="inherit" onClick={myPage2}>
              Add &nbsp;&nbsp; <AddIcon></AddIcon>
              </Button>

          </Stack>
        </Toolbar>
      </AppBar>
      <Typography variant="h5" component="div"  justify="flex-start" sx={{ flexGrow: 1 }} fontFamily='Monospace'>
        <p></p>
           &nbsp;&nbsp; Welcome to MGMT Movie Reviews!
          </Typography>
      <Typography variant="h7" component="div"  justify="flex-start" sx={{ flexGrow: 1 }}>
        <p></p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - There are 4 different pages: Search, Reviews, MyPage, and the Landing Page you are currently on!
          </Typography>

      <Typography variant="h7" component="div"  justify="flex-start" sx={{ flexGrow: 1 }}>
        <p></p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - <b>Search Page</b>: Search for movies based on Movie Title, Actor, Director
          </Typography>
      <Typography variant="h7" component="div"  justify="flex-start" sx={{ flexGrow: 1 }}>
        <p></p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - <b>Reviews Page</b>: Write a review for a specific movie
          </Typography>
      <Typography variant="h7" component="div"  justify="flex-start" sx={{ flexGrow: 1 }}>
        <p></p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - <b>My Page</b>: Select one of my favourite actors/actress, and see what they look like!
          </Typography>


      <Typography variant="h7" component="div"  justify="flex-start" sx={{ flexGrow: 1 }}>
        <br></br>
        &nbsp;&nbsp; Navigate to the different pages by clicking the name (ie. Search, Review, etc), and to go back to the landing page (current page) click the movie icon button!
          </Typography>
      <Typography variant="h7" component="div"  justify="flex-start" sx={{ flexGrow: 1 }}>
        <br></br>
        Enjoy the website, and start exploring!
        <br></br>
        <hr></hr>
        Created by: John Kachura
          </Typography>
      </Box>
  );
};

// export default Landing;
export default withStyles(styles)(Landings);
