import React,{ useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import { Radio, colors, Fab, Grid } from '@material-ui/core';
// import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import { GiScales } from 'react-icons/gi';
//import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: "10px"
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        //color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    compare: {
        //display: "inline-flex"
    }
}));

export default function FCImagesGrid(props) {
    const classes = useStyles();
    const [list, setList] = useState([]);
    const [sorce, setSorce] = useState("");
    const corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
    const dontShow = ["Item_id", "Receipt_id", "User_id", "Id_type", "Item_image", "Store_lat", "Store_lon", "User_rank"];
    const priceTitle = (item) => {
        let defauldPrice = item.Price + "$";
        if (item.Discount_dollar > 0 || item.Discount_percent > 0) {
            return <><span style={{ textDecorationLine: "line-through" }}>{defauldPrice}</span>&#160;&nbsp;&nbsp;&nbsp;{`${((item.Price - item.Discount_dollar) * (1 - item.Discount_percent / 100))}$`}</>;
        } else {
            return defauldPrice;
        }
    }
    useEffect(() => {
        setList(
            props.items.map((item, i) => (
                // <Grid item key={i}>
                <GridListTile >
                    <img src={item.Item_image} />
                    <p>bla bla bla</p>
                    <GridListTileBar
                        title={item.Item_title}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionPosition="left"
                        subtitle={priceTitle(item)}
                    />
                    <p>bla bla bla</p>
                </GridListTile>
                // </Grid>
            ))
        )
    }, [props.items])
    return (
        <div className={classes.compare} >
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {list}
                </GridList>
            </div>
        </div>

    );
}
