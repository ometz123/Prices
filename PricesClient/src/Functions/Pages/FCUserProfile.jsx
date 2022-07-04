import React, { useContext, useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { UserContext } from '../../Contexts/UserContext';
import { GiUnicorn, GiModernCity, GiSkeletonKey, GiMale, GiFemale } from 'react-icons/gi';
import { FaBirthdayCake } from 'react-icons/fa';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import {
    ListItemIcon, ListItem, TextField,
    Button, RadioGroup, Radio,
    Dialog, DialogTitle, DialogContent, FormControlLabel,
    DialogContentText, DialogActions, Chip
} from '@material-ui/core';
import PricesLogo from '../../Images/PricesLogo.png'
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import SaveIcon from '@material-ui/icons/Save';
import { DatePicker, MuiPickersUtilsProvider/*, TimePicker, DateTimePicker*/ } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function ControlledAccordions() {
    const { user, SetUser } = useContext(UserContext);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    let local = true;
    let http = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/`;
    let updateURL = `users/UpdateUser`;
    let loginURL = `Users/Login`;
    //let httpUpdate = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/users/UpdateUser`;
    //let httpLogin = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/Users/Login`;
    if (local) {
        //httpUpdate = `https://localhost:44377/api/users/UpdateUser`;
        //httpLogin = `https://localhost:44377/api/Users/Login`;
        http = `https://localhost:44377/api/`;
    }
    const [passwordMassege, setPasswordMassege] = useState("")
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogContent, setDialogContent] = useState("")
    const [passwordAdditionalDialogContent, setPasswordAdditionalDialogContent] = useState("")
    const [passwordButton, setPasswordButton] = useState(false);
    const [nameButton, setNameButton] = useState(false);
    const [field2Update, setField2Update] = useState('');
    const [noticeMessege, setNoticeMessege] = useState('');
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [form, setForm] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
        password1: '',
        password2: '',
        birthDate: user.birthDate,
        gender: user.gender,
        state: user.state,
        city: user.city
    });

    const handleProfileChange = val => e => {
        setForm({ ...form, [val]: e.target.value })
    }
    const handlebirthDayChange = val => e => {
        setForm({ ...form, [val]: e })
    }
    const handleName = (e) => {
        e.preventDefault();
        setField2Update("name");
        setDialogTitle("Change name?")
        setDialogContent(
            <>
                old: <Chip label={user.firstName + " " + user.lastName} />
                <br />
                <br />
                new: <Chip label={form.firstName + " " + form.lastName} />
            </>
        )
        setOpen(true);
    }
    const handlePassword = (e) => {
        e.preventDefault();
        if (form.password1 === form.password2) {
            setField2Update("password");
            setDialogTitle("Change password?")
            setNoticeMessege("Notice! after password change you will be logout")
            setPasswordAdditionalDialogContent("old ")
            setOpen(true);
        } else {

        }

    }
    const handleBirthDate = (e) => {
        e.preventDefault();
        setField2Update("birthdate");
        setDialogTitle("Change birthdate?");
        //console.log(form.birthDate, new Date(form.birthDate).toLocaleDateString());
        setDialogContent(
            <>
                old: <Chip label={new Date(user.birthDate && user.birthDate.split("T")[0]).toLocaleDateString()} />
                <br />
                <br />
                new: <Chip label={new Date(form.birthDate).toLocaleDateString()} />
            </>
        )
        setOpen(true);

    }
    const handleGenderhange = (e) => {
        e.preventDefault();
        setField2Update("gender");
        setDialogTitle("Change Gender?")
        setDialogContent(
            <>
                old: <Chip label={user.gender ? user.gender == 1 ? "Male" : "Female" : "Unicorn"} />
                <br />
                <br />
                new: <Chip label={form.gender ? form.gender == 1 ? "Male" : "Female" : "Unicorn"} />
            </>
        );
        setOpen(true);
    }
    const handleStateChange = (e) => {
        e.preventDefault();
        setField2Update("state");
        setDialogTitle("Change State?")
        setDialogContent(
            <>
                old: <Chip label={user.state ? user.state : "Somewhere"} />
                <br />
                <br />
                new: <Chip label={form.state ? form.state : "Somewhere"} />
            </>
        );
        setOpen(true);
    }
    const handleCityChange = (e) => {
        e.preventDefault();
        setField2Update("city");
        setDialogTitle("Change City?")
        setDialogContent(
            <>
                old: <Chip label={user.city ? user.city : "Over The Rainbow"} />
                <br />
                <br />
                new: <Chip label={form.city ? form.city : "Over The Rainbow"} />
            </>
        );
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setPasswordAdditionalDialogContent("");
        setNoticeMessege("")
        setForm({ ...form, password: '' })

    }

    const handleUpdate = () => {
        if (form.password === user.password) {
            let fixedDate = new Date(form.birthDate);
            fixedDate.setHours(fixedDate.getHours() - fixedDate.getTimezoneOffset() / 60);
            fixedDate.setMinutes((fixedDate.getHours() - fixedDate.getTimezoneOffset()) % 60);
            // console.log("x: ", fixedDate);

            let user2Update = {
                User_id: user.userId,
                First_name: form.firstName,
                Last_name: form.lastName,
                Password: form.password2,
                //Birthdate: form.birthDate,
                Birthdate: fixedDate,
                Gender: form.gender == 1 ? true : false,
                State: form.state,
                City: form.city,
                Field2update: field2Update
            };
            // console.log("user2Update.Birthdate: ", user2Update.Birthdate);
            // console.log("form.birthDate: ", form.birthDate);
            // console.log("json user2Update: ", JSON.stringify(user2Update.Birthdate));
            // console.log("json form: ", JSON.stringify(new Date(form.birthDate)));
            fetch(http + updateURL, {
                method: 'POST',
                body: JSON.stringify(user2Update),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
                .then(res => {
                    return res.json();
                })
                .then(
                    (result) => {
                        console.log("Update fetch= ", result);
                        if (field2Update === "password") {
                            localStorage.removeItem('userContext');
                            SetUser({
                                ...user,
                                loggedIn: false
                            });
                        } else if (result.Message) {
                            alert(result.Message)
                        } else {
                            logIn(result);
                        }
                    },
                    (error) => {
                        console.log("err post=", error);
                        alert("sorry, somthing went wrong")
                    });

            handleClose();
        } else {
            alert("wrong password!")
        }

    }
    const logIn = (password) => {
        let User = {
            User_id: user.userId,
            Password: password !== '' ? password : user.password
        }
        fetch(http + loginURL, {
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
                    console.log("profileUpdateLogin fetch= ", result);
                    SetUser({
                        ...user,
                        firstName: result.First_name,
                        lastName: result.Last_name,
                        rank: result.User_rank,
                        birthDate: result.Birthdate,
                        gender: result.Gender,
                        state: result.State,
                        city: result.City,
                        password: result.Password
                    });
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    useEffect(() => {//name
        //console.log(form.firstName, form.lastName);
        if (form.firstName.length > 1 || form.lastName.length > 1) {
            setNameButton(true)
        } else {
            setNameButton(false)
        }
    }, [form.firstName, form.lastName])

    useEffect(() => {//password
        if (form.password2.length > 0) {
            if (form.password1 === form.password2) {
                setPasswordButton(true);
                setPasswordMassege(<Typography color="primary">Passwords match</Typography>);
            } else {
                setPasswordMassege(<Typography color="secondary">Passwords not match</Typography>);
                setPasswordButton(false);
            }
        } else {
            setPasswordMassege("");
            setPasswordButton(false);
        }
    }, [form.password1, form.password2]);

    useEffect(() => {
        setForm({
            firstName: user.firstName,
            lastName: user.lastName,
            password: '',
            password1: '',
            password2: '',
            birthDate: user.birthDate,
            gender: user.gender,
            state: user.state,
            city: user.city
        });
    }, [user])
    return (
        <div className={classes.root}>
            <img src={PricesLogo} alt="Prices" style={{ height: "160px" }} />
            <Accordion expanded={expanded === 'panelName'} onChange={handleChange('panelName')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelNamebh-content"
                    id="panelNamebh-header"
                >
                    <ListItemIcon>
                        {user.gender == 1 ? <FcBusinessman /> : user.gender == 0 ? <FcBusinesswoman /> : <GiUnicorn color="#f38ab2" />}
                    </ListItemIcon>
                    <Typography className={classes.heading}>Name</Typography>
                    <Typography className={classes.secondaryHeading}>{user.firstName} {user.lastName}</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <ListItem>
                        <form
                            onSubmit={e => handleName(e)}
                            style={{ textAlign: "center" }}
                        >
                            <TextField
                                inputProps={{ maxLength: 50, minLength: 2 }}
                                variant="outlined"
                                size="small"
                                label="First name"
                                placeholder={user.firstName}
                                value={form.firstName}
                                onChange={handleProfileChange("firstName")}
                            />
                            <TextField
                                inputProps={{ maxLength: 50, minLength: 2 }}
                                variant="outlined"
                                size="small"
                                label="Last name"
                                value={form.lastName}
                                placeholder={user.lastName}
                                onChange={handleProfileChange("lastName")}

                            />
                            <br />
                            <Button
                                disabled={!nameButton}
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                Save
                              </Button>
                        </form>
                    </ListItem>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panelPassword'} onChange={handleChange('panelPassword')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelPasswordbh-content"
                    id="panelPasswordbh-header"
                >
                    <ListItemIcon>
                        {<GiSkeletonKey color="saddlebrown" />}
                    </ListItemIcon>
                    <Typography className={classes.heading}>Password</Typography>
                    <Typography className={classes.secondaryHeading}>********</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <ListItem>
                        <form onSubmit={e => handlePassword(e)} style={{ textAlign: "center" }}>
                            <TextField
                                type="password"
                                inputProps={{ maxLength: 16, minLength: 8 }}
                                variant="outlined"
                                size="small"
                                label="New password"
                                onChange={handleProfileChange("password1")}
                            />
                            <TextField
                                type="password"
                                inputProps={{ maxLength: 16, minLength: 8 }}
                                variant="outlined"
                                size="small"
                                label="Confirm new password"
                                onChange={handleProfileChange("password2")}
                            />
                            {passwordMassege}
                            <br />
                            <Button
                                disabled={!passwordButton}
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                Save
                              </Button>
                        </form>
                    </ListItem>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panelBirthDate'} onChange={handleChange('panelBirthDate')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelBirthDatebh-content"
                    id="panelBirthDatebh-header"
                >
                    <ListItemIcon>
                        <FaBirthdayCake color="#fcaf17" />
                    </ListItemIcon>
                    <Typography className={classes.heading}>BirthDay</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {new Date(user.birthDate && user.birthDate.split("T")[0]).toLocaleDateString()}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ justifyContent: "center" }}>
                    <form onSubmit={e => handleBirthDate(e)} >
                        <ListItem >

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Fragment>
                                    <DatePicker
                                        size="small"
                                        clearable
                                        disableFuture
                                        value={form.birthDate === '' ? new Date() : form.birthDate}
                                        inputVariant="outlined"
                                        label="Birthday"
                                        onChange={handlebirthDayChange("birthDate")}
                                        animateYearScrolling
                                    />
                                </Fragment>
                            </MuiPickersUtilsProvider>
                        </ListItem>
                        <Button
                            disabled={form.birthDate > 0 ? false : true}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
                              </Button>

                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panelGender'} onChange={handleChange('panelGender')} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelGenderbh-content"
                    id="panelGenderbh-header"
                >
                    <ListItemIcon>

                        {user.gender == 1 ? <GiMale color="dodgerblue" /> : user.gender == 0 ? <GiFemale color="deeppink" /> : <GiUnicorn color="#f38ab2" />}
                    </ListItemIcon>
                    <Typography className={classes.heading}>Gender</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {user.gender == 1 ? "male" : user.gender == 0 ? "female" : "unicorn"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ justifyContent: "center" }}>
                    <form onSubmit={e => handleGenderhange(e)}>

                        <RadioGroup row aria-label="gender" name="gender1" value={form.gender}
                            onChange={handleProfileChange("gender")}>
                            <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="Female"
                                labelPlacement={'bottom'}
                                checked={form.gender == 0}
                            />

                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="Male"
                                labelPlacement={'bottom'}
                                checked={form.gender == 1}
                            />
                        </RadioGroup>

                        <Button
                            disabled={form.gender == user.gender}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
                              </Button>

                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panelState'} onChange={handleChange('panelState')} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelStatebh-content"
                    id="panelStatebh-header"
                >
                    <ListItemIcon>

                        <PublicTwoToneIcon color="primary" />
                    </ListItemIcon>
                    <Typography className={classes.heading}>State</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {user.state ? user.state : "Somewhere"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ justifyContent: "center" }}>
                    <form onSubmit={e => handleStateChange(e)} style={{ textAlign: "center" }}>
                        <TextField
                            type="text"
                            inputProps={{ maxLength: 50, minLength: 3 }}
                            variant="outlined"
                            size="small"
                            label="New State"
                            onChange={handleProfileChange("state")}
                        />
                        <br />
                        <Button
                            disabled={form.state === ''}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
                              </Button>
                    </form>
                </AccordionDetails>

            </Accordion>
            <Accordion expanded={expanded === 'panelCity'} onChange={handleChange('panelCity')} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panelCitybh-content"
                    id="panelCitybh-header"
                >
                    <ListItemIcon>

                        <GiModernCity color="darkgreen" />
                    </ListItemIcon>
                    <Typography className={classes.heading}>City</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {user.city ? user.city.length > 2 ? user.city : "Over The Rainbow" : "Over The Rainbow"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ justifyContent: "center" }}>
                    <form onSubmit={e => handleCityChange(e)} style={{ textAlign: "center" }}>
                        <TextField
                            type="text"
                            inputProps={{ maxLength: 50, minLength: 2 }}
                            variant="outlined"
                            size="small"
                            label="New City"
                            onChange={handleProfileChange("city")}
                        />
                        <br />
                        <Button
                            disabled={form.city === ''}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
                              </Button>
                    </form>
                </AccordionDetails>

            </Accordion>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    {dialogContent}
                    <DialogContentText id="alert-dialog-description">
                        Please enter your {passwordAdditionalDialogContent}password to confirm
                    </DialogContentText>
                    <TextField
                        type="password"
                        inputProps={{ maxLength: 16, minLength: 8 }}
                        variant="outlined"
                        size="small"
                        label="Password"
                        onChange={handleProfileChange("password")}
                    />
                    <Typography color="secondary">
                        {noticeMessege}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
          </Button>
                    <Button onClick={handleUpdate} color="primary" autoFocus>
                        Agree
          </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}
