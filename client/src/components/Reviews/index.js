import React, { Component } from "react";
import history from "../Navigation/history";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//Selects imports
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

//Text field imports
import TextField from "@material-ui/core/TextField";

//Radio Importans
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

//Toastify
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

//Header app bar shit
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from '@mui/material/IconButton';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3021"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

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

class Home extends Component {
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

  loadUserSettings() {
    this.callApiLoadUserSettings().then((res) => {
      //console.log("loadUserSettings returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("loadUserSettings parsed: ", parsed[0].mode);
      this.setState({ mode: parsed[0].mode });
    });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  };
  
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Review classes={classes} />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

//Parent Component!! ------------------- !! ------> include button logic and all states in this parent component
const Review = (props) => {
  const [movie, setMovie] = React.useState("");

  const selectedMovie = (event) => {
    setMovie(event.target.value);
    console.log("movie that was picked", movie);
  };

  const [title, setTitle] = React.useState("");

  const enteredTitle = (event) => {
    setTitle(event.target.value);
    console.log("Title is", title);
  };

  const [review, setReview] = React.useState("");

  const enteredReview = (event) => {
    setReview(event.target.value);
    console.log("Review include:", review);
  };

  const [rating, setRating] = React.useState("");

  const selectedRating = (event) => {
    setRating(event.target.value);
    console.log("Rating is", rating);
  };

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiLoadMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiLoadMovies parsed: ", parsed);
        setMovies(parsed);
      })
  }

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
  }

  const addReview = () => {
    callApiAddReview()
      .then(res => {
        console.log("callApiAddReview returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiAddReview parsed: ", parsed);
      })
  }

  const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
      ,body: JSON.stringify({
        movieID: movie,
        title: title,
        review: review,
        rating: rating
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
  }

  // const movieName = movies.filter((movie) => movie.id === movie)

  const notify = () => toast.error("Please select a movie");
  const notify2 = () => toast.error("Please enter your review title");
  const notify3 = () => toast.error("Please enter your review");
  const notify4 = () => toast.error("Please select the rating");
  const notify5 = () =>
    toast.success(
      <div>
        <font size="+1">Your review has been recieved 🔥 </font>
        <br></br>
        <br></br>
        <b>🎥 Movie:</b> {movie}
        <br></br>
        <b>🔤 Title:</b> {title}
        <br></br>
        <b>🗣️ Review:</b> {review}
        <br></br>
        <b>🌟 Rating:</b> {rating}
      </div>
    );

  const emptyCheck = (event) => {
    console.log("Button is clicked");
    var filled = true;

    if (movie.length === 0) {
      notify();
      filled = false;
    }
    if (title.length === 0) {
      notify2();
      filled = false;
    }
    if (review.length === 0) {
      notify3();
      filled = false;
    }
    if (rating.length === 0) {
      notify4();
      filled = false;
    }
    if (filled) {
      notify5();
      addReview();
    }
  };


  const Search = (event) => {
    console.log("Search Button is clicked");
    history.push('/Search')
  };

  const Reviews = (event) => {
    console.log("Reviews Button is clicked");
    history.push('/Reviews')
  };

  const myPage = (event) => {
    console.log("myPage Button is clicked");
    history.push('/myPage')
  };

  const land = (event) => {
    console.log("land Button is clicked");
    history.push('/')
  };

  return (
    <MuiThemeProvider theme={theme}>

    <Box sx={{ flexGrow: 2 }} >
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
          <Button  color="inherit" onClick={myPage}>
              Add &nbsp;&nbsp;<AddIcon></AddIcon>
              </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      </Box>

      <CssBaseline />
      <Grid
        container
        spacing={2}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: "80vh" }}
        className={props.classes.mainMessageContainer}
      >
        {/* 3b Typo element with header for website */}
        <Grid item>
          <Typography variant="h3" gutterBottom="true">
            <b>Movie Review</b>
          </Typography>
        </Grid>

        <Grid item>
          <MovieSelection
            className={props.label}
            selectedMovie={selectedMovie}
            moviesList={movies}
          />
        </Grid>

        <Grid item>
          <ReviewTitle label="Review Title" enteredTitle={enteredTitle} />
        </Grid>

        <Grid item>
          <ReviewBody label="Input Review" enteredReview={enteredReview} />
        </Grid>

        <Grid item>
          <ReviewRating label="Movie Rating" selectedRating={selectedRating} />
        </Grid>

        <Grid item>
          {/* 3g Submit button */}
          <Button variant="contained" color="secondary" onClick={emptyCheck}>
            Submit
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

//3c MUI Select element with 5 movie titles
const MovieSelection = ({className, selectedMovie, moviesList}) => (
  <Box sx={{ minWidth: 250 }}>
    <FormControl className={className} fullWidth>
      <InputLabel id="select-movie">Select Movie</InputLabel>
      <Select
        labelId="select-movie"
        id="simple-select-movie"
        onChange={selectedMovie}
      >
        {moviesList.map((movie, index) => (
          <MenuItem
            key={movie.name}
            value={movie.id}
            >{movie.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

//3d Single line Text Field for user to input title of the review
const ReviewTitle = (props) => (
  <Box sx={{ minWidth: 250 }}>
    <FormControl className={props.className} fullWidth>
      <div>
        <TextField
          id="review-title"
          label={props.label}
          fullWidth
          onChange={props.enteredTitle}
        />
      </div>
    </FormControl>
  </Box>
);

//3e MUI Text Field (200 Char) for the review
const ReviewBody = (props) => (
  <div>
    <Box sx={{ minWidth: 345 }}>
      <FormControl className={props.className} fullWidth>
        <TextField
          id="required"
          label={props.label}
          inputProps={{ maxLength: 200 }}
          onChange={props.enteredReview}
          placeholder="Review"
          fullWidth
          multiline
        />
      </FormControl>
    </Box>
  </div>
);

//3f 5 Radio buttons to review movie from a scale 1 to 5
const ReviewRating = (props) => (
  <div>
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup
        row
        aria-label="position"
        name="position"
        defaultValue="top"
        onChange={props.selectedRating}
      >
        <FormControlLabel
          value={"1"}
          control={<Radio color="primary" />}
          label="1"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value={"2"}
          control={<Radio color="primary" />}
          label="2"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value={"3"}
          control={<Radio color="primary" />}
          label="3"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value={"4"}
          control={<Radio color="primary" />}
          label="4"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value={"5"}
          control={<Radio color="primary" />}
          label="5"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  </div>
);

export default withStyles(styles)(Home);
