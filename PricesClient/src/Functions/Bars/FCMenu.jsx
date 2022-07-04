import React, { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import FCCard from '../eXtra/FCCard';
import {
  Badge, Dialog, DialogTitle, /*DialogContentText,*/
  DialogContent, CircularProgress, SwipeableDrawer,
  List, Divider, ListItem, ListItemIcon, ListItemText,
  IconButton,
  Typography,
  DialogActions,
  Button,
  FormHelperText
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import MenuIcon from '@material-ui/icons/Menu';
import PricesLogo from '../../Images/PricesLogo.png'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import LoyaltyTwoToneIcon from '@material-ui/icons/LoyaltyTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import Red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CloseIcon from '@material-ui/icons/Close';
import ThumbDownAltTwoToneIcon from '@material-ui/icons/ThumbDownAltTwoTone';
import { set } from 'date-fns/esm';
//import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
//import List from '@material-ui/core/List';
//import Divider from '@material-ui/core/Divider';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
//import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function FCMenu(props) {

  const { user, SetUser } = useContext(UserContext);
  const classes = useStyles();
  const [chatOpen, setChatOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [verifyReceiptsOpen, setVerifyReceiptsOpen] = useState(false);
  const [receipt4Update, setReceipt4Update] = useState();
  const [state, setState] = useState({    //top: false,
    left: false,    //bottom: false,    //right: false,
  });

  let local = true;
  let http = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/`;
  let getFavorites = `lists/GetUserFavoriteItems`;
  let setReceiptStatus = `users/SetReceiptStatus`;
  let getreceipts2verify = `users/GetReceipts2verify`;
  if (local) {
    http = `https://localhost:44377/api/`;
  }
  const loading = <CircularProgress
    style={{ color: '#fcaf17', animationDuration: '550ms', strokeLinecap: 'round', }}
    size={45} thickness={4} />
  const [favorites, setFavorites] = useState(loading);
  const [valid, setValid] = useState(false);
  const [verifyReceipts, setVerifyReceipts] = useState(loading);
  const favs =
    <Dialog
      open={favoritesOpen}
      onClose={() => handleClose("favorites")}
      style={{ textAlign: "-webkit-center" }}
    >
      <DialogTitle id="simple-dialog-title">
        <Typography >
          {`${user.firstName}'s Favorites`}
          <IconButton aria-label="close" /*className={classes.closeButton}*/ onClick={() => handleClose("favorites")}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <Divider />
      </DialogTitle>
      <DialogContent /*style={{placeSelf: "center"}}*/>
        {favorites}
      </DialogContent>
    </Dialog>;

  const newReceiptsToApprove =
    <Dialog
      open={verifyReceiptsOpen}
      onClose={() => handleClose("newReceipts")}
      style={{ textAlign: "-webkit-center" }}
    >
      <DialogTitle id="simple-dialog-title">
        <Typography >
          {`verify Receipt`}
          <IconButton aria-label="close" /*className={classes.closeButton}*/ onClick={() => handleClose("verifyReceipts")}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <Divider />
      </DialogTitle>
      <DialogContent /*style={{placeSelf: "center"}}*/>
        {verifyReceipts}
      </DialogContent>
      <div style={{ placeSelf: "center", textAlignLast: "center" }}>
        <DialogActions>
          <Button variant="outlined" disabled={!valid}
            onClick={() => SetReceiptStatus(false)} color="secondary">
            Reject {<ThumbDownAltTwoToneIcon />}
          </Button>
          <Button variant="outlined" disabled={!valid}
            onClick={() => SetReceiptStatus(true)} style={valid ? { color: "#47761E" } : null} autoFocus>
            Verify {<VerifiedUserIcon />}
          </Button>
        </DialogActions>
        <FormHelperText>* If you are not sure, Just Exit</FormHelperText>
      </div>
    </Dialog>;



  const handleClose = (dialog) => {
    if (dialog === "favorites") {
      setFavoritesOpen(false);
      setFavorites(loading);
    }
    if (dialog === "verifyReceipts") {
      setVerifyReceiptsOpen(false);
      setVerifyReceipts(loading);
      setValid(false);
    }
  }
  const toggleDrawer = (anchor, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleChat = () => {
  }
  const handleVerifyReceipts = () => {
    setVerifyReceiptsOpen(true);
    getReceipts2Verify();
  }
  const getReceipts2Verify = () => {
    let adminUser = {
      User_id: user.userId,
    };
    fetch(http + getreceipts2verify/*httpGetReceipts2verify*/, {
      method: 'POST',
      body: JSON.stringify(adminUser),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("Receipts to verify cards fetch= ", result);
          if (result.length > 0) {
            setValid(true);
            setReceipt4Update(result[0]);
            setVerifyReceipts(
              <div>
                {result.map((item, i) => <FCCard item={item} key={i} parent={"receipts2verify"} />)}
              </div>
            );
          } else {
            setVerifyReceipts(
              <div>
                No Receipts to verify
              </div>
            );
          }
        },
        (error) => {
          console.log("err post=", error);
          setValid(false);
          setVerifyReceipts(<p style={{ color: "#fcaf17" }}>Sorry, there was a problem <br />Please try again later </p>)
          //alert("sorry, somthing went wrong");
        });
  }
  const SetReceiptStatus = (status) => {
    if (window.confirm(`Are you sure the receipt is ${status ? 'Correct' : 'Wrong'}?`)) {
      let receipt2Verify = {
        receipt_id: receipt4Update.Receipt_id,
        User_id: receipt4Update.User_id,
        status: status
      }
      fetch(http + setReceiptStatus/*httpSetReceiptStatus */ /*+ `?receipt_id=${receiptId}&status=${status}`*/, {
        method: 'POST',
        body: JSON.stringify(receipt2Verify),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      })
        .then(res => {
          return res.json();
        })
        .then(
          (result) => {
            //console.log("receipt status fetch= ", result);
            alert(`Thank you for check the receipt and ${result ? 'Verify' : 'Reject'} it.`)
          },
          (error) => {
            console.log("err post=", error);
            alert("sorry, somthing went wrong");
          });
      handleClose("verifyReceipts");
    }
  }
  const getFavoritesCards = () => {
    let user2getFavorites = {
      User_id: user.userId,
    };
    fetch(http + getFavorites/*httpGetFavorites*/, {
      method: 'POST',
      body: JSON.stringify(user2getFavorites),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("favorites cards fetch= ", result);
          setFavorites(
            <div>
              {result.length > 0 ? result.map((item, i) => <FCCard item={item} key={i} parent={"favorites"} />) : "No Favorites"}
            </div>
          )
        },
        (error) => {
          console.log("err post=", error);
          setFavorites(<p style={{ color: "#fcaf17" }}>Sorry, there was a problem <br />Please try again later </p>);
          //alert("sorry, somthing went wrong");
        });
  }
  const handleFavorites = () => {
    setFavoritesOpen(true);
    getFavoritesCards();
  }
  const handleUserProfile = () => {
    props.profilePage()
    console.log('====================================');
    console.log("Clicked Profile");
    console.log('====================================');
  }
  const logOut = () => {
    SetUser({ loggedIn: false })
    //localStorage.removeItem('userContext');
    localStorage.clear();

  }
  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={handleUserProfile} >
          <ListItemIcon ><PersonOutlineTwoToneIcon color="primary" /></ListItemIcon>
          <ListItemText
            primary={<>{user.firstName}&nbsp;{user.lastName}</>}
            secondary={<>{user.rank}<StarTwoToneIcon fontSize="small" htmlColor="#fcaf17" /></>}
          />
        </ListItem>
        <Divider />

        {/* <ListItem button disabled>
          <ListItemIcon onClick={handleChat}><ChatTwoToneIcon htmlColor={green[700]} /></ListItemIcon>
          <ListItemText primary={"Chats"} />
        </ListItem> */}
        <ListItem button onClick={handleFavorites}>
          <ListItemIcon ><LoyaltyTwoToneIcon htmlColor={Red['A700']} /></ListItemIcon>
          <ListItemText primary={"Favorites"} />
          <Badge
            badgeContent={user.favorites ? user.favorites.length : '0'}
            showZero
            color={"primary"}
          />
        </ListItem>
        {user.rank > 2000 &&
          <ListItem button >
            <ListItemIcon onClick={handleVerifyReceipts}><VerifiedUserIcon htmlColor='#fcaf17' /></ListItemIcon>
            <ListItemText onClick={handleVerifyReceipts} primary={"verify Receipts"} />
          </ListItem>}
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <ListItem button onClick={() => logOut()}>
          <ListItemIcon><MeetingRoomIcon htmlColor="black" /></ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>
    </div>
  );



  return (
    <div>
      <React.Fragment >
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer('left', true)}
        >
          {/* <MenuIcon /> */}
          <img src={PricesLogo} alt="Prices" style={{ height: "40px" }} />
        </IconButton>
        <SwipeableDrawer
          //anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
      {favs}
      {newReceiptsToApprove}
    </div>
  );
}
