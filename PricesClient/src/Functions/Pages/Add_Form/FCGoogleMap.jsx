import React, { useState, useEffect, useContext } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle, InfoWindow } from 'google-maps-react';
import { SearchContext } from '../../../Contexts/SearchContext';
import { UserContext } from '../../../Contexts/UserContext';
import { ListsContext } from '../../../Contexts/ListsContext';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import storeIcon from '../../../Images/baseline_local_grocery_store_black_48dp.png';
import { Button } from '@material-ui/core';

const googleApiKey = `...`;

function FCGoogleMap(props) {
    const { search, setSearch } = useContext(SearchContext);
    const { user, setUserLocation } = useContext(UserContext);
    const { stores, FetchStores } = useContext(ListsContext);
    const [positionByUserLocation, setPositionByUserLocation] = useState(true)
    const [activeMarker, setActiveMarker] = useState();
    const [state, setState] = useState({
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        title: "",

    });
    //#region position status (getLocation())
    function getLocation() {
        console.log('getLocation was called');
        navigator.permissions.query({
            name: 'geolocation'
        }).then((result) => {
            if (result.state === 'granted') {
                console.log("result.state: ", result.state);
                //geoBtn.style.display = 'none';
            } else if (result.state === 'prompt') {
                console.log("result.state: ", result.state);
                //geoBtn.style.display = 'none';

            } else if (result.state === 'denied') {
                console.log("עליך לאשר שימוש במיקום");
                console.log("result.state: ", result.state);

                //geoBtn.style.display = 'inline';
            }
            result.onchange = function () {
                console.log(result.state);
            }
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, positionError);
        } else {
            console.log('Geolocation is not supported by this device')
        }
    }
    function positionError() {
        console.log('Geolocation is not enabled. Please enable to use this feature')

        //if(allowGeoRecall) getLocation()
    }
    function showPosition() {
        console.log('position accepted')
        //allowGeoRecall = false
    }
    //#endregion
    // const fetchPlaces = (mapProps, map) => {
    //     const { google } = mapProps;
    //     //const service = new google.maps.places.PlacesService(map);
    //     console.log("google: ", google);
    //     console.log("map: ", map);
    //     //console.log("google.maps.places: ", google.maps.places);
    // }

    const handleMapClick = (e) => {
        const { latLng } = e;
        setSearch({
            ...search,
            lat: latLng.lat(),
            lng: latLng.lng()
        });
        //positionByUserLocation = !positionByUserLocation;
        setPositionByUserLocation(false)
        //console.log("search: ", search);
    }

    const handleResetLocation = async () => {
        //getLocation();
        //await setUserLocation();
        setSearch({
            ...search,
            lat: user.userLocation ? user.userLocation.latitude : search.lat,
            lng: user.userLocation ? user.userLocation.longitude : search.lng
        })
        //console.log("search: ", search);
        setPositionByUserLocation(true);
    }
    const handleMarkerClick = (props2, marker, e) => {
        //console.log("props: ", props2, "marker: ", marker, "e: ", e);
        setActiveMarker(marker);
        setState({
            selectedPlace: props2,
            activeMarker: marker,
            showingInfoWindow: true,
            title: marker.name
        });
        if (props.parent === "FCStoreDetails") {
            handleMapClick(e)
        }
    }


    useEffect(() => {
        //console.log("props: ", props);
        //console.log("props2: ", props.google.maps.places);
        //props.setAutoCompleteFromFCGoogleMap(props.google.maps.places);
        const asyncuseEffect = async () => {
            await setUserLocation();
            //console.log("user(googleMap): ", user);
            //console.log("search(googleMap): ", search);
            //console.log(positionByUserLocation);
            if (positionByUserLocation) {
                await setSearch({
                    ...search,
                    lat: user.userLocation ? user.userLocation.latitude : search.lat,
                    lng: user.userLocation ? user.userLocation.longitude : search.lng
                });
            }
        }
        asyncuseEffect();
    }, [positionByUserLocation/*,search, setSearch, setUserLocation, user*/]);
    //useEffect(() => { console.log(stores); }, [stores])
    useEffect(() => { FetchStores(); }, []);

    return (
        <div style={{
            //width: "300px",
            height: "300px",
            //margin: "10px",
        }}>
            <Button color="primary" variant="contained" style={{ margin: "5px" }}>
                <GpsFixedIcon onClick={() => handleResetLocation()} />
            </Button>
            <Map
                google={props.google}
                zoom={12}
                style={props.parent === "FCStoreDetails" ? mapStylesStore : mapStylesSearch}
                containerStyle={props.parent === "FCStoreDetails" ? containerStyleStore : containerStyleSearch}
                initialCenter={{ lat: search.lat, lng: search.lng }}
                center={{ lat: search.lat, lng: search.lng }}
                onClick={(...e) => handleMapClick(e[2])}
            >
                {props.parent !== "FCStoreDetails" && <Circle
                    radius={1000 * search.distance}
                    center={{ lat: search.lat, lng: search.lng }}
                    onClick={(...e) => handleMapClick(e[2])}
                    strokeColor='transparent'
                    fillColor='#fcaf17'
                    fillOpacity={0.4}
                />}
                <InfoWindow
                    //marker={state.activeMarker}
                    marker={state.activeMarker}
                    visible={state.showingInfoWindow}
                >
                    <div style={{ maxWidth: '40vw' }}>
                        <p style={{ color: "black" }}>{state.title}</p>
                    </div>
                </InfoWindow>
                <Marker
                    zIndex={11}
                    onClick={handleMarkerClick}
                    position={{ lat: search.lat, lng: search.lng }}
                    animation={props.google.maps.Animation.DROP}
                    name={positionByUserLocation ? "your location" : "search location"}
                />
                {stores.map((store, i) =>
                    <Marker
                        onClick={handleMarkerClick}
                        name={store.Store_name}
                        //label={store.Store_name}
                        zIndex={10}
                        key={i}
                        position={{ lat: store.Lat, lng: store.Lon }}
                        //animation={props.google.maps.Animation.DROP}
                        icon={{
                            url: storeIcon,
                            //anchor: props.google.maps.Point(10, 10),
                            //scaledSize: props.google.maps.Size(5, 5)
                        }}
                    />)
                }

            </Map>
        </div >
    );
}
const mapStylesStore = {
    //maxWidth: '300px',
    //maxHeight: '260px',
    //position: 'relative',
    //width: '100%',
    //height: '100%'
    width: '90%',
    height: '100%',
    position: 'relative'
};
const containerStyleStore = {
    //maxHeight: '260px',
    //width: "-webkit-fill-available",
    //height: '100%',
    //position: 'relative',  
    //maxWidth: '301px',
    maxHeight: '300px',
    //
    //position: 'absolute',
    //width: '100%',
    //height: '100%'
    //
    overflow: "hidden",
    paddingBottom: "56.25%",
    //position: "relative",
    //height: "0",
    //
    left: "0",
    //top: "0",
    height: "100%",
    width: "100%",
    position: "absolute",

}
const mapStylesSearch = {
    //maxWidth: '300px',
    maxHeight: '260px',
    position: 'relative',
    width: '100%',
    height: '100%'
};
const containerStyleSearch = {
    //maxHeight: '260px',
    width: '90%',
    margin: "0px 5%",
    height: "250px"
    //height: '100%',
    //position: 'relative',  
    //maxWidth: '301px',
    //maxHeight: '300px',
}
//export default FCGoogleMapView;
export default GoogleApiWrapper(
    {
        apiKey: googleApiKey,
        language: "he",
    })(FCGoogleMap);
