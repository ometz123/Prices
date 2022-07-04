import React, {/*useState,*/useContext/*, useEffect*/ } from 'react';
import { /*Switch, Route, Link,*/ withRouter } from 'react-router-dom';
//import FCBottomNavigation from './Bars/FCBottomNavigation';
import FCLogIn from './Pages/FCLogIn';
//import '../Styles/mysass.scss';
import FCTopBar from './Bars/FCTopBar';
import { UserContext } from '../Contexts/UserContext';
//import {  ListsContext } from '../Contexts/ListsContext';
//import { useEffect } from 'react';

function FCPrices(props) {
    const { user/*, setUserLocation */} = useContext(UserContext);
    //const { /*tags,*/ FetchTags } = useContext(ListsContext);
    //const [loggedIn/*, setLoggedIn*/] = useState(false)
    //useEffect(setUserLocation, []);
    //useEffect(()=>{ FetchTags() }, []);
    if (user.loggedIn) {
        //FetchTags();
        return (
            <div
                style={{
                    textAlign: "-webkit-center",//מיישר את התוכן
                    // position: "fixed",
                    // top: "0px",
                    width: "100%"
                }}>
                <FCTopBar />
            </div>
        );
    } else
        return (
            <div style={{ textAlign: "-webkit-center" }}>
                <FCLogIn />
            </div>
        );
}

export default withRouter(FCPrices);