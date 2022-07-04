import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import FCMenu from './FCMenu';
import FCSearch from '../Pages/FCSearch';
import FCExplore from '../Pages/FCExplore';
import FCUserProfile from '../Pages/FCUserProfile';
import { UserContext } from '../../Contexts/UserContext';
import { SearchContext } from '../../Contexts/SearchContext';
import { AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu } from '@material-ui/core';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
//import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
//import InputBase from '@material-ui/core/InputBase';
//import MenuItem from '@material-ui/core/MenuItem';
//import Menu from '@material-ui/core/Menu';
import ExploreIcon from '@material-ui/icons/Explore';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
//import '../../Styles/mysass.scss';
import AddIcon from '@material-ui/icons/Add';
import FCAdd from '../Pages/FCAdd';

//

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    //position: "fixed",
    //top: "0px",
    //zIndex: 999,
    //width: 500
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  user: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function FCTopBar(props) {
  const { user/*, SetUser*/ } = useContext(UserContext);
  const { search, setSearch } = useContext(SearchContext);
  //#region 
  // let filteredList = [
  //   {
  //     id: 1, title: "Bamba", price: 100, discount: 0, image: Bamba, store: "Moshe's Pitzutzia", receipt: Receipt,
  //     description: {
  //       top: `Bamba is a baked snack containing 50% peanuts,
  //                   enriched in vitamins and iron and free of preservatives and food coloring.`,
  //       middle: `Due to its uniqueness – soft yet crispy, savory yet sweet – Bamba is loved by Israelis of all ages.
  //                   Bamba is the bestselling snack in Israel, accounting for close to a quarter of the snacks market.`,
  //       bottom: `90% of Israeli households buy Bamba regularly and every day 1 million bags of Bamba are produced.        
  //                   Bamba was first produced in 1964 with a cheese flavor and in 1966 the cheese flavor was replaced in favor of peanut butter – 
  //                   the winning flavor that has made Bamba part of Israeli culture.`,

  //     }
  //   },
  //   {
  //     title: "Doritos", price: 200, id: 2, image: Doritos, store: "Haim's Pitzutzia", receipt: Receipt,
  //     description: {
  //       top: `"Some things simply go best with the guys" At Doritos, we believe that your very best friends are much more than just friends.`,
  //       middle: `They are the ones who make up the experiences, memories and moments that stay with you for life,
  //        the ones that leave you hungry for more long after they're gone.
  //         Because between us, the things you'll remember in life aren't the exams or the math lessons, but that time when you were sitting on the fence,
  //          eating Sweet 'N Sour Doritos and telling jokes for hours.`,
  //       bottom: `Or that day in summer when it was soooo hot you all had absolutely no choice but to cut history class
  //       and go hang out on the beach with a bag of Flaming Hot Doritos. Like a snuggle rug in winter,
  //        ketchup on fries or a song by Britney at a great party, Doritos is that little extra "crunch"
  //         that hits the spot every time you meet up with the guys, making each get-together perfect.
  //          No matter if it's summer or winter, if you're home or out or if the music is the coolest or sucks,
  //           all you need is a bag of Doritos and your very best friends, and it'll turn into that kind of evening you'll never forget…`,
  //     }
  //   },
  //   {
  //     title: "Oreo Ice Cream", price: 300, id: 3, image: OreoIceCream, store: "Dani's Pitzutzia", receipt: Receipt,
  //     description: {
  //       top: ``,
  //       middle: ``,
  //       bottom: ``,
  //     }
  //   }];
  //#endregion
  const [title, setTitle] = useState("Prices")
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleAdd = () => {
    props.history.push({ pathname: "/add" })
    setTitle("Add");
    handleMobileMenuClose();
  }
  const handleExplore = () => {
    props.history.push({ pathname: "/" })
    setTitle("Explore");
    handleMobileMenuClose();
  }
  const handleSearch = () => {
    props.history.push({ pathname: "/search" })
    setTitle("Search");
    handleMobileMenuClose();
  }
  const handleProfile = () => {
    props.history.push({ pathname: "/profile" })
    setTitle("Profile");
    handleMobileMenuClose();
  }
  const handleSearchText = (e) => {
    setSearch({
      ...search, text: e ? e : null
    })
  }

  useEffect(() => {
    localStorage.setItem('userContext', JSON.stringify(user));
    //"React Hook useEffect has a missing dependency" error without putting the function in the effect
    // const handleExplore = () => {
    //   props.history.push({ pathname: "/" })
    //   setTitle("Explore");
    //   handleMobileMenuClose();
    // }
    if (localStorage.getItem('lastPage')) {

      switch (localStorage.getItem('lastPage').toLowerCase()) {
        case "search":
          handleSearch();
          break;
        case "profile":
          handleProfile();
          break;
        case "add":
          handleAdd();
          break;
        default:
          handleExplore();
          break;
      }
    } else {
      handleExplore();
    }
    //localStorage.setItem('lastPage', title);
    //React Hook useEffect has a missing dependency
    //handleExplore();
    //handleProfile()
    //handleSearch()
  }, [/*props.history*/]);//react suggestion (props.history)

  useEffect(() => {
    localStorage.setItem('lastPage', title);
  }, [title]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      
    >
      <MenuItem onClick={handleMenuClose}>{user.firstName}'s Profile</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>{user.name}'s account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleAdd()}>
        <IconButton aria-label="add new receipt" color="inherit" >
          <AddIcon />
        </IconButton>
        <p>Add Receipt</p>
      </MenuItem>
      <MenuItem onClick={() => handleExplore()}>
        <IconButton aria-label="explore items" color="inherit">
          <ExploreIcon />
        </IconButton>
        <p>Explore</p>
      </MenuItem>
      <MenuItem
        //onClick={handleProfileMenuOpen}
        onClick={handleProfile}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{user.firstName}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static"
        style={{
          position: "fixed",
          top: "0px",
          width: "100%",
          zIndex: 999,
        }}>
        <Toolbar>
          <FCMenu profilePage={handleProfile}/>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.search} onClick={() => handleSearch()}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              autoComplete="off"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              //value={search.text}
              inputProps={{ 'aria-label': 'search' }}
              //onClick={() => handleSearch()}
              onChange={(e) => handleSearchText(e.target.value)}
            />

          </div>
          {/* <Typography className={classes.user} variant="h6" noWrap>
            Hello {user.firstName}
          </Typography> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => handleAdd()}
              color="inherit"
            >
              <AddIcon />
            </IconButton>
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => handleSearch()}
              color="inherit"
            >
              <SearchIcon />
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => handleExplore()}
              color="inherit"
            >
              <ExploreIcon />
            </IconButton>
            {/* <IconButton aria-label="Add your's" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <AddBoxIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              //onClick={handleProfileMenuOpen}
              onClick={handleProfile}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div style={{ paddingTop: "65px" }}>
        <Switch>
          <Route path="/add" >
            <FCAdd />
          </Route>
          <Route path="/search" >
            <FCSearch />
          </Route>
          <Route path="/profile" >
            <FCUserProfile />
          </Route>
          <Route exact path="/">
            <FCExplore />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default withRouter(FCTopBar);