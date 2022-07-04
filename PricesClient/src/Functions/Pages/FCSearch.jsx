import React, { useContext, useRef, useEffect, useState } from 'react';
import { SearchContext } from '../../Contexts/SearchContext';
import { ReceiptContext } from '../../Contexts/ReceiptContext';
import { UserContext } from '../../Contexts/UserContext';
import FCCard from '../eXtra/FCCard';
import FCCompareList from '../eXtra/FCCompareList';
import FCGooglePlacesSearch from './Add_Form/FCGooglePlacesSearch';
import FCTags from './Add_Form/FCTags';
import FCGoogleMap from './Add_Form/FCGoogleMap';
import FCSlider from '../eXtra/FCSlider';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Button, CircularProgress } from '@material-ui/core';
import KeyboardArrowUpTwoToneIcon from '@material-ui/icons/KeyboardArrowUpTwoTone';
import { ListsContext } from '../../Contexts/ListsContext';
//import Button from '@material-ui/core/Button';
//import { useState } from 'react';
//import FCCompareGrid from '../eXtra/FCCompareGrid';
//import CircularProgress from '@material-ui/core/CircularProgress';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 50);

const useStyles = makeStyles((theme) => ({
    show: {
        //display: 'block',
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        zIndex: '99',
        //size: '18px',
        border: 'none',
        outline: 'none',
        //backgroundColor: 'red',
        //color: 'white',
        cursor: 'pointer',
        padding: '15px',
        borderRadius: '20px',
        //display: "inline-block",
    },
    hide: {
        display: 'none',
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        zIndex: '99',
        //size: '18px',
        border: 'none',
        outline: 'none',
        //backgroundColor: 'red',
        //color: 'white',
        cursor: 'pointer',
        padding: '15px',
        //borderRadius: '4px',
        //display: "inline-block",
    },
    circle: {
        color: '#fcaf17',
        animationDuration: '550ms',
        strokeLinecap: 'round',
    },
}));

function FCSearch(props) {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    //const [itemToCheck, setItemToCheck] = useState({});
    const { search, setSearch } = useContext(SearchContext);
    const { user } = useContext(UserContext);
    const [show, setShow] = useState(false)
    const [resultItems, setResultItems] = useState();
    const { receipt, SetReceipt } = useContext(ReceiptContext);
    //const [searchResults, setSearchResults] = useState([]);
    const { /*tags,*/ FetchTags } = useContext(ListsContext);
    const [searching, setSearching] = useState(false);

    const myGoogleKey = `AIzaSyC47_J_bDoU4euesrr-ChlFjRpas0HzLQM`;
    let local = true;
    let http = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/`;
    if (local) {
        http = `https://localhost:44377/api/`;
    }
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const handleSubmit = (e) => {
        setItems([]);
        let api = http + `items/GetItemsForSearch`;
        //console.log("search(FCSearch): ", search);
        setSearching(true);
        //setResultItems(<CircularProgress className={classes.circle} size={45} thickness={4} />);
        //console.log('fetch items: ');
        let Search = {
            User: {
                User_rank: user.rank,
                Lon: search.lng,
                Lat: search.lat,
            },
            Distance_radius: search.distance,
            Max_price: search.maxPrice,
            Min_price: search.minPrice,
            OverPriceRange: search.maxPrice === 'max',
            Title_Words: search.text,
            Tags: search.tags
        }
        //console.log(Search);

        fetch(api, {
            method: 'POST',
            body: JSON.stringify(Search),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    setSearching(false);
                    console.log("fetch FetchGet= ", result);
                    if (result.length !== 0) {
                        updateResultItems(result);
                    }
                    else {
                        setResultItems("No match for this search");
                    }
                },
                (error) => {
                    console.log("err post=", error);
                    setSearching(false);
                    setResultItems(<p style={{ color: "#fcaf17" }}>Sorry, there was a problem <br />Please try again later </p>);
                });
    }
    const updateResultItems = (result) => {
        setResultItems(
            result.map((item, i) => <FCCard
                item={item} key={i}
                compare
                hadleCompareList={hadleCompareList}
            />));
        executeScroll();

    }
    const getPlaceDetails = (place_id, storeName) => {
        SetReceipt({ ...receipt, store: { name: storeName } })

        let api = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${myGoogleKey}`;
        let corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
        fetch(corsAnywhere + api, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
        })
            .then(res => { return res.json() })
            .then((result) => {
                console.log("fetch FetchGet= ", result);
                let storeLatLon = result.results[0].geometry.location;
                //console.log(storeLatLon);
                //setLatLon(storeLatLon)
                setSearch({
                    ...search,
                    lat: storeLatLon.lat,
                    lng: storeLatLon.lng
                });
                SetReceipt({ ...receipt, store: { name: storeName, lat: storeLatLon.lat, lon: storeLatLon.lng } })

            },
                (error) => {
                    console.log("err post=", error);
                });
    }
    window.onscroll = () => {
        //console.log(document.documentElement.scrollTop);

        if (document.documentElement.scrollTop < 216) {
            setShow(false)

            //console.log("block");
            //mybutton.style.display = "block";
        } else {
            //console.log("none");
            setShow(true);
            //mybutton.style.display = "none";
        }
    }
    const hadleCompareList = (check, itemToHandle) => {
        if (check) {
            setItems(oldItems => [...oldItems, itemToHandle]);
        } else {
            setItems(oldItems => (oldItems.filter((item) => item.Item_id !== itemToHandle.Item_id)));
        }
    }
    useEffect(() => { window.scrollTo(0, 0) }, []);
    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            FetchTags();
        }
        return () => {
            unmounted = true;
        }
    }, []);


    return (
        <div>
            <div>
                <div >
                    <FCGooglePlacesSearch color="white"
                        getPlaceDetails={getPlaceDetails}
                    //autoCompleteFromFCGoogleMap={autoCompleteFromFCGoogleMap}
                    //handleLocation={(locationEvent) => handleLocation(locationEvent)}
                    />
                    <FCGoogleMap
                    //setAutoCompleteFromFCGoogleMap={setAutoCompleteFromFCGoogleMap}
                    />
                </div>
                {/* <div style={{
                    //width: "300px",
                    height: "250px",
                    margin: "10px",
                }}
                >
                </div> */}
                <div >
                    <FCTags color="white" />
                </div>
                <div >
                    <FCSlider />
                </div>
                {/* <input
                    type="button"
                    onClick={() => { console.log(search) }}
                    value="Search"
                /> */}
                {searching ?
                    <CircularProgress className={classes.circle} size={45} thickness={4} /> :
                    <p>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => { handleSubmit() }}
                            ref={myRef}
                        >
                            Search
                        </Button>
                    </p>
                }
            </div>
            {/* {items2Compare.length > 0 ? <FCCompareGrid items={items2Compare} /> : null} */}
            {/* <Stam /> */}
            {/* {items.length > 0 && <FCCompareGrid items={items} />} */}
            <FCCompareList items={items} hadleCompareList={hadleCompareList} />
            {resultItems}
            <Fab //upButton
                size="small"
                color={"secondary"}
                className={show ? classes.show : classes.hide}
                onClick={() => window.scrollTo(0, 0)}
            ><KeyboardArrowUpTwoToneIcon /></Fab>

        </div>
    );
}

export default FCSearch;