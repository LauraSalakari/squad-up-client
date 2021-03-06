import React, { Component } from 'react'
import "./App.css";
import { withRouter, Route, Switch } from 'react-router-dom';
import { API_URL } from "./config";
import Axios from 'axios';
import Landing from './components/Landing';
import MyNav from './components/MyNav';
import MyGuestNav from './components/MyGuestNav';
import SignUpForm from './components/SignUpForm';
import SignIn from "./components/SignIn"
import EditProfile from "./components/EditProfile"
import Settings from './components/Settings';
import Security from './components/Security';
import ProfilePage from './components/ProfilePage';
import Squads from './components/Squads';
import CreateSquad from './components/CreateSquad';
import SquadDetails from "./components/SquadDetails"
import EditSquad from './components/EditSquad';
import Forums from './components/Forums';
import CreateThread from './components/CreateThread';
import PostDetails from "./components/PostDetails"
import EditPost from './components/EditPost';
import Chat from './components/Chat';
import ChatLog from './components/ChatLog';

class App extends Component {

  state = {
    user: null,
    errorMessage: null
  }

  componentDidMount() {
    if (!this.state.user) {
      Axios.get(`${API_URL}/user`, { withCredentials: true })
        .then((response) => {
          this.setState({
            user: response.data
          })
        })
    }
  }

  //signup
  handleSignUp = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = e.target;
    Axios.post(`${API_URL}/signup`, {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data
        }, () => {
          this.props.history.push("/profile/edit"); //change this to prof edit page!!// technically this shouldn't change the user state??
        })
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.errorMessage
        })
      })
  }

  //signin
  handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    Axios.post(`${API_URL}/signin`, {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data
        }, () => {
          this.props.history.push("/"); //where should this actually redirect?
        })
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.response.data.errorMessage
        })
      })

  }

  //logout
  handleLogout = () => {
    Axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
      .then(() => {
        this.setState({
          user: null
        }, () => {
          this.props.history.push("/");
        })
      })
  }

  //handle errormessages onunmount for now
  handleUnmount = () => {
    this.setState({
      errorMessage: null
    })
  }

  // NOTE: if more than one platform is selected, the value is returned in an array
  // eg. e.target.platforms[1].value will store the object that holds all the platform info
  // with a single choice -> e.target.platforms.value
  handleProfileEdit = (e) => {
    e.preventDefault();

    const { image, bio, platforms, games } = e.target;

    console.log("length:", platforms.length);

    let platformData = [];
    if (!platforms.length) {
      platformData.push(platforms.value);
    }
    else {
      for (let i = 0; i < platforms.length; i++) {
        platformData.push(platforms[i].value);
      }
    }
    console.log("platforms: ", platformData)

    let gameData = [];
    if (!games.length) {
      gameData.push(games.value);
    }
    else {
      for (let i = 0; i < games.length; i++) {
        gameData.push(games[i].value);
      }
    }

    console.log("games: ", gameData)

    if (!image.value) {
      let userData = {
        username: this.state.user.username,
        email: this.state.user.email,
        image: this.state.user.image || "https://res.cloudinary.com/meetpup/image/upload/v1604869142/prof-default-icon_ody7zu.png",
        bio: bio.value,
        platforms: platformData,
        games: gameData,
        _id: this.state.user._id
      }

      Axios.patch(`${API_URL}/profile/edit`, userData, { withCredentials: true })
        .then((response) => {
          console.log(response.data)
          this.setState({
            user: response.data
          }, () => {
            this.props.history.push(`/profile/${this.state.user._id}`);
            // this.props.history.push(`/`);

          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else {
      let imageFile = image.files[0];

      let uploadForm = new FormData();
      uploadForm.append("imageUrl", imageFile)

      Axios.post(`${API_URL}/upload`, uploadForm, { withCredentials: true })
        .then((response) => {
          let userData = {
            username: this.state.user.username,
            email: this.state.user.email,
            image: response.data.image,
            bio: bio.value,
            platforms: platformData,
            games: gameData,
            _id: this.state.user._id
          }

          Axios.patch(`${API_URL}/profile/edit`, userData, { withCredentials: true })
            .then((response) => {
              console.log(response.data)
              this.setState({
                user: response.data
              }, () => {
                this.props.history.push(`/profile/${this.state.user._id}`);
                // this.props.history.push(`/`);
              })
            })
            .catch((err) => {
              console.log("prof edit", err)
            })
        })
        .catch((err) => {
          console.log("img upload", err)
        })
    }
  }

  handleChangePassword = (e) => {
    e.preventDefault();
    const {password, newPassword, confirmPassword} = e.target;

    Axios.patch(`${API_URL}/profile/password`, {
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }, {withCredentials: true})
    .then((response) => {
      console.log("pw change successful")
      this.setState({
        user: response.data
      }, () => {
        this.props.history.push("/settings");
      })  
    })
  }

  handleCreateSquad = (e) => {
    e.preventDefault();
    const {title, description, game, maxSize} = e.target;
    let setGame = JSON.parse(game.value);

    let data = {
      title: title.value,
      description: description.value,
      game: setGame.name,
      maxSize: maxSize.value,
      creator: this.state.user._id,
      members: [this.state.user._id]
    }

    console.log("create squad called", data);
    Axios.post(`${API_URL}/squads/create`, data, {withCredentials: true})
    .then((response) => {
      console.log(response.data)
      this.props.history.push(`/squads/${response.data._id}`)
    })

  }

  render() {
    const { errorMessage, user } = this.state;

    return (
      <div className="App">
        {user ? <MyNav onLogout={this.handleLogout} user={user}/> : <MyGuestNav />}
        <div className="mainBox">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/signup" render={(routeProps) => {
            return <SignUpForm onUnmount={this.handleUnmount} errorMessage={errorMessage} onSignUp={this.handleSignUp} {...routeProps} />
          }} />
          <Route path="/signin" render={(routeProps) => {
            return <SignIn onUnmount={this.handleUnmount} errorMessage={errorMessage} onSignIn={this.handleSignIn} {...routeProps} />
          }} />
          <Route path="/settings" component={Settings} />
          <Route path="/profile/edit" render={(routeProps) => {
            return <EditProfile onEditProfile={this.handleProfileEdit} user={user} {...routeProps} />
          }}
          />
          <Route path="/profile/security" render={(routeProps) => {
            return <Security user={user} onChangePassword={this.handleChangePassword} {...routeProps} />
          }}
          />
          <Route exact path="/profile/:id" component={ProfilePage}/>
          <Route exact path="/squads" component={Squads} />
          <Route path="/squads/create" render={(routeProps) => {
            return <CreateSquad user={user} onCreateSquad={this.handleCreateSquad} {...routeProps} />
          }}
          />
          <Route exact path="/squads/:id" render={(routeProps) => {
            return <SquadDetails user={user} {...routeProps} />
          }} />
          <Route path="/squads/:id/edit" component={EditSquad} />
          <Route exact path="/forums" component={Forums} />
          <Route path="/forums/new" render={(routeProps) => {
            return <CreateThread user={user} {...routeProps} />
          }} />
          <Route exact path="/forums/:id" render={(routeProps) => {
            return <PostDetails user={user} {...routeProps}/>
          }} />
          <Route path="/forums/:id/edit" component={EditPost} />
          <Route path="/chat/:id" render={(routeProps) => {
            return <Chat user={user} {...routeProps} />
          }} />
          <Route exact path="/chat" render={(routeProps) => {
            return <ChatLog user={user} {...routeProps} />
          }}/>
        </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)