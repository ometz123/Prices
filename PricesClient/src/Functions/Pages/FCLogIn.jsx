import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import FCDatePicker from './Add_Form/FCDatePicker';
import { CircularProgress, Typography, FormHelperText, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, InputLabel, Input, FormControl } from '@material-ui/core';
import PricesLogo from '../../Images/PricesLogo.png'

//import { Input, TextField } from '@material-ui/core';

const myStyles = {
    logIn: {
        margin: '10px',
        width: '200px',
        height: '30px'
    },

    name: {
        height: '30px',
        width: '100px',
        margin: '10px',
    }

};
export default function FCLogIn(props) {
    const { user, SetUser } = useContext(UserContext);
    const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
    const [connecting, setConnecting] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    // const [currentTarget, setCurrentTarget] = useState(false);
    const [forgotDialog, setForgotDialog] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    let local = true;
    let api = `http://proj.ruppin.ac.il/bgroup4/prod/server/api`;
    const httpLogin = `/Users/Login`;
    const httpGetUsersEmails = `/lists/GetAllUsersEmails`;
    const httpForgotPassword = `/users/ForgotPassword`;
    //let httpGetFavorites = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/lists/GetUserFavoriteItems`;
    if (local) {
        api = `https://localhost:44377/api`;
        //httpGetFavorites = `https://localhost:44377/api/lists/GetUserFavoriteItems`;
    }

    const [newUser, SetNewUser] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        rank: 1000,
        loggedIn: false,
        userLocation: null,
        birthDate: null,
        gender: null,
        state: null,
        city: null,
        password: null
    });
    const SignUpNewUser = (e) => {
        e.preventDefault();
        //console.log(newUser);
        let NewUser = {
            User_id: newUser.userId,
            First_name: newUser.firstName,
            Last_name: newUser.lastName,
            Password: newUser.password,
            Birthdate: newUser.birthDate,
            Gender: newUser.gender,
            State: newUser.state,
            City: newUser.city,
            User_rank: newUser.rank
        };
        let api = `https://localhost:44377/api/Users/SignUp`
        //let api = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/Users/SignUp`;
        setSigningUp(true);
        fetch(api, {
            method: 'POST',
            body: JSON.stringify(NewUser),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => { return res.json(); })
            .then(
                (result) => {
                    console.log("Explore fetch= ", result);
                    setSigningUp(false);
                    logUserIn(result, NewUser);
                },
                (error) => {
                    setSigningUp(false);
                    console.log("err post=", error);
                    alert("sorry, somthing went wrong");
                });
    }
    const logIn = (e) => {
        if (e) {
            e.preventDefault();
        }
        setConnecting(true);
        //console.log("user: ", user);
        let User = {
            User_id: user.userId,
            Password: user.password
        }
        //let api = `https://localhost:44377/api/Users/Login`
        //let api = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/Users/Login`;
        fetch(api + httpLogin, {
            method: 'POST',
            body: JSON.stringify(User),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }
        )
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("logIn fetch= ", result);
                    logUserIn(result, User);
                    setConnecting(false);
                },
                (error) => {
                    console.log("err post=", error);
                    setConnecting(false);
                    alert("sorry, somthing went wrong");
                });
    }
    const logUserIn = async (result, User) => {
        //console.log(result.User_id == User.User_id && result.Password == User.Password);
        if (result.User_id === User.User_id && result.Password === User.Password) {
            await SetUser({
                ...user,
                //userId: result.Userid,//why is it like this suddenly?
                userId: result.User_id,//correct way
                firstName: result.First_name,
                lastName: result.Last_name,
                rank: result.User_rank,
                loggedIn: result.User_id === User.User_id && result.Password === User.Password,
                birthDate: result.Birthdate,
                gender: result.Gender,
                state: result.State,
                city: result.City,
                password: result.Password,
                favorites: result.Favorites,
            });
            //localStorage.setItem('userContext', JSON.stringify(user));
            //console.log(JSON.parse(localStorage.getItem('userContext')));

        }
        else {
            alert("שם משתמש או סיסמה שגויה");
        }
    }
    const getUsersEmails = () => {
        fetch(api + httpGetUsersEmails, {
            method: 'GET',
            //body: JSON.stringify(User),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }
        )
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("logIn fetch= ", result);
                    setRegisteredUsers(result);
                },
                (error) => {
                    console.log("err post=", error);
                    console.log(error);
                    alert("sorry, somthing went wrong"+JSON.stringify(error));
                });
    }
    //need to return!! very important --moved to FCTopBar
    // useEffect(() => {
    //     if (user.loggedIn === true) {
    //         localStorage.setItem('userContext', JSON.stringify(user));
    //         console.log("localStorage (userContext): ", JSON.parse(localStorage.getItem('userContext')));
    //     }
    // }, [user.loggedIn]);
    const hanldeForgot = () => {
        console.log(forgotEmail);
        fetch(api + httpForgotPassword, {
            method: 'POST',
            body: JSON.stringify(forgotEmail),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }
        )
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("logIn fetch= ", result);
                    alert(result?`We sent an email to '${forgotEmail}'`:`We did not find '${forgotEmail}' in our users`)
                },
                (error) => {
                    console.log("err post=", error);
                    console.log(error);
                    alert("sorry, somthing went wrong");
                });
        setForgotDialog(false);

    }
    const handleForgotMenuClose = () => {
        setForgotDialog(false);
    }
    useEffect(() => {
        let userFromStorage = JSON.parse(localStorage.getItem('userContext'));
        if (userFromStorage) {
            SetUser(userFromStorage);
        }
        else {
            getUsersEmails();
        }
    }, []);
    return (
        <div>
            <img src={PricesLogo} alt="Prices" style={{ height: "100px" }} />
            {/* <button onClick={hanldeForgot}>hanlde Forgot</button> */}
            <form onSubmit={(e) => logIn(e)}>
                <fieldset>
                    <legend>Log In</legend>
                    <input type="email" name="email" id="email" placeholder="Email"
                        required
                        pattern={emailPattern}
                        onChange={(e) => SetUser({ ...user, userId: e.target.value })}
                        style={myStyles.logIn} />
                    <input type="password" name="password" id="password" placeholder="Password"
                        minLength="8"
                        maxLength="16"
                        onChange={(e) => SetUser({ ...user, password: e.target.value })}
                        style={myStyles.logIn} required />
                    <br />
                    {connecting ?
                        <CircularProgress
                            style={{
                                color: '#fcaf17', animationDuration: '550ms', strokeLinecap: 'round',
                            }} size={45} thickness={4} /> :
                        <input type="submit" value="Log In"
                        //onClick={(e) => logIn(e)}
                        />}
                    <br />
                    <a
                        href="#"
                        style={{ color: "#9cb4d8" }}
                        onClick={() => setForgotDialog(true)} >
                        <small>
                            Forgot account?
                    </small>
                    </a>
                    <br />
                    {/* <input type="checkbox" name="localStorage" id="" style={{ float: "left" }} /> */}
                </fieldset>
            </form>
            <br />
            <form onSubmit={(e) => SignUpNewUser(e)}>
                <fieldset>
                    <legend>Sign up!</legend>
                    <input type="text" placeholder="First Name" style={myStyles.name}
                        required
                        minLength="2"
                        maxLength="50"
                        onChange={(e) => SetNewUser({ ...newUser, firstName: e.target.value })}
                    />
                    <input type="text" placeholder="Last Name" style={myStyles.name}
                        required
                        minLength="2"
                        maxLength="50"
                        onChange={(e) => SetNewUser({ ...newUser, lastName: e.target.value })}
                    />
                    <br />
                    {registeredUsers.includes(newUser.userId) && <Typography color={"secondary"} >This Email is already in use</Typography>}
                    <input type="email" placeholder="Email" style={myStyles.logIn}
                        required
                        pattern={emailPattern}
                        onChange={(e) => SetNewUser({ ...newUser, userId: e.target.value })}
                    />
                    <input type="password" placeholder="Password" style={myStyles.logIn}
                        required
                        minLength="8"
                        maxLength="16"
                        onChange={(e) => SetNewUser({ ...newUser, password: e.target.value })}
                    />
                    <br />
                    <input type="text" placeholder="State" style={myStyles.logIn}
                        required
                        minLength="3"
                        maxLength="50"
                        onChange={(e) => SetNewUser({ ...newUser, state: e.target.value })}
                    />
                    <input type="text" placeholder="City" style={myStyles.logIn}
                        required
                        minLength="2"
                        maxLength="50"
                        onChange={(e) => SetNewUser({ ...newUser, city: e.target.value })}
                    /><br />
                    <FCDatePicker
                        title={"BirthDay"}
                        req={true}
                        onDateChange={(e) => SetNewUser({ ...newUser, birthDate: e })} />
                    <br />
                    {/* <TextField type="date" variant="outlined" /> */}
                    <fieldset>
                        <legend>Gender</legend>
                        <input type="radio" name="gender" value={true} required
                            onChange={(e) => SetNewUser({ ...newUser, gender: e.target.value })}
                        /> Male
                        <br />
                        <input type="radio" name="gender" value={false} required
                            onChange={(e) => SetNewUser({ ...newUser, gender: e.target.value })} /> Female
                    </fieldset>
                    <br />
                    {signingUp ?
                        <CircularProgress
                            style={{
                                color: '#fcaf17', animationDuration: '550ms', strokeLinecap: 'round',
                            }} size={45} thickness={4}
                        /> :
                        <input type="submit"
                            disabled={registeredUsers.includes(newUser.userId)}
                            //onClick={(e) => SignUpNewUser(e)}
                            value="Sign Up!" />
                    }
                </fieldset>
            </form>
            <div >
                <Dialog
                    style={{ textAlign: "-webkit-center" }}
                    open={forgotDialog}
                    onClose={handleForgotMenuClose}
                >
                    <form onSubmit={hanldeForgot} autoComplete="off">
                        <DialogTitle>{"Forgot Your Account?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <small>Please enter your email to search for your account.</small>
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                onChange={(e) => setForgotEmail(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleForgotMenuClose} color="primary">
                                Cancel
                        </Button>
                            <Button
                                //onSubmit={hanldeForgot}
                                type="submit"
                                color="primary">
                                Send
                        </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </div>
    );
}


