import React, { useContext, useEffect, useState } from 'react';
import FCCard from '../eXtra/FCCard';
import { UserContext } from '../../Contexts/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
//import { SearchContext } from '../../Contexts/SearchContext';

// Inspired by the former Facebook spinners.
const progressCircle = makeStyles((theme) => ({
    circle: {
        color: '#fcaf17',
        animationDuration: '550ms',
        strokeLinecap: 'round',
    },
}));
export default function FCExplore(props) {
    // let list = props.filteredList.map(el => {
    //     return <FCCard details={el} key={el.id} />
    // })
    const classes = progressCircle();

    const [exploreItems, setExploreItems] = useState(null);
    //const { search } = useContext(SearchContext);
    const { user, setUserLocation } = useContext(UserContext);
    let local = true;
    let http = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/`;
    if (local) {
        http = `https://localhost:44377/api/`;
    }
    let Search = {
        User: {
            User_rank: user.rank,
            Lon: null,
            Lat: null,
        },
        Distance_radius: 20,
        Max_price: -1,//set Max_price search to max 

    }
    const getItems = () => {
        setExploreItems(<CircularProgress className={classes.circle} size={45} thickness={4} />);
        Search.User.Lat = user.userLocation.latitude;
        Search.User.Lon = user.userLocation.longitude;
        let api = http + `items/GetItemsForSearch`;
        fetch(api, {
            method: 'POST',
            body: JSON.stringify(Search),
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
                    console.log("Explore fetch= ", result);
                    if (result.length !== 0) {
                        setExploreItems(result.map(item => {
                            return <FCCard item={item} key={item.Item_id} />

                        }));
                    } else {
                        setExploreItems("Nothing to see around you, try Search for a wider range");
                    }
                },
                (error) => {
                    setExploreItems(<p style={{ color: "#fcaf17" }}>Sorry, there was a problem <br />Please try again later </p>);
                    console.log("err post=", error);
                });

    }

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            const a = async () => { await setUserLocation(); };
            a().then(() => {
                if (user.userLocation) {
                    console.log('====================================');
                    console.log(user.userLocation);
                    console.log('====================================');
                    getItems();
                }
            });
        }
        return () => {
            unmounted = true;
        }

    }, [user.userLocation ? user.userLocation.latitude : []]);

    if (user.userLocation) {
        return (
            <div>
                {exploreItems}
            </div>
        );
    } else {
        return (
            <div>
                <p style={{ color: "#fcaf17" }}>In order to use this feature you must enable location access</p>

            </div>
        );
    }

}

