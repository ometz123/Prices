import React, { useEffect, useState } from 'react';
import FCTableCompare from './FCTableCompare';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import {
    Fab, Badge, Button, Dialog, useMediaQuery,
    DialogContent, DialogActions, List, ListItem,
    ListItemAvatar, ListItemText, Avatar, Grid
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { GiScales } from 'react-icons/gi';
import CompareTwoToneIcon from '@material-ui/icons/CompareTwoTone';
//import FCImagesGrid from './FCCompareGrid';
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//import ListItemText from '@material-ui/core/ListItemText';
//import Avatar from '@material-ui/core/Avatar';
//import IconButton from '@material-ui/core/IconButton';
//import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
//import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demoShow: {
        //flexGrow: 1,
        //maxWidth: 752,
        //backgroundColor: "#fcaf17",
        position: 'fixed',
        bottom: '70px',
        left: '30px',
        zIndex: '99',
        radius: "10px"
    },
    demo: {
        //backgroundColor: theme.palette.background.paper,
        color: "white",
        //secondaryColor:"white",
        maxHeight: `300px`,
        maxWidth: `300px`,
        overflow: "overlay",
        // secondary: {
        //   //color: 'white',
        // },
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
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

export default function FCCompareList(props) {
    const classes = useStyles();
    const [list2Compare, setList2Compare] = useState([]);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const themeCompare = useTheme();
    const fullScreen = useMediaQuery(themeCompare.breakpoints.down('sm'));
    // const removeItem = (item) => {
    //     props.hadleCompareList(false, item)
    // }

    const handleCompare = () => {
        //console.log(list2Compare);
        //compare2jsons(list2Compare[0], list2Compare[1])
        setOpen(true);
    }
    // const compare2jsons = (myObj1, myObj2) => {
    //     let keys = Object.keys(myObj1);
    //     let dontShow = ["Item_id", "Receipt_id", "User_id", "Id_type", "Item_image", "Store_lat", "Store_lon", "User_rank"];
    //     for (let key of keys) {
    //         if (!dontShow.includes(key)) {
    //             if (myObj1[key] != null && myObj2[key] != null) {

    //                 if (myObj1[key] == myObj2[key]) {
    //                     console.log(`equal (${key}):\n1. ${myObj1[key]} \n2. ${myObj2[key]}`);
    //                 } else {
    //                     console.log(`diff (${key}):\n1. ${myObj1[key]} \n2. ${myObj2[key]}`);
    //                 }
    //             }
    //         }
    //     }
    // }
    const handleCloseCompare = () => {
        setOpen(false);
    }
    /**
diff (Item_title):
1. לחם פרוס 
2. עוגיות של אקלר
FCCompareList.jsx:86 diff (Price):
1. 7.67 
2. 24.9
FCCompareList.jsx:86 diff (Discount_dollar):
1. 0 
2. 0
FCCompareList.jsx:86 diff (Discount_percent):
1. 0 
2. 0
FCCompareList.jsx:86 diff (Item_Description):
1.  
2. 
FCCompareList.jsx:86 diff (Tags):
1. [object Object] 
2. [object Object],[object Object]
FCCompareList.jsx:84 equal (Store_name):
1. מינימרקט אבי, שרה אהרונסון, רמת גן, ישראל 
2. מינימרקט אבי, שרה אהרונסון, רמת גן, ישראל
FCCompareList.jsx:84 equal (Distance):
1. 97.24038633629905 
2. 97.24038633629905
     */
    let priceTitle = (item) => {
        if (item.Discount_dollar > 0 || item.Discount_percent > 0) {
            return "After discounts: " + ((item.Price - item.Discount_dollar) * (1 - item.Discount_percent / 100)) + "$";
        } else {
            return item.Price + "$";
        }
    }
    useEffect(() => {
        setList2Compare(props.items);
    }, [props.items])

    let list = props.items.map((item, i) => {
        return (
            <div key={i} style={{ backgroundColor: "#fcaf17", borderRadius: "50px", margin: "2px" }}>
                <ListItem>
                    <ListItemAvatar >
                        <Avatar style={{ border: "solid black 1px" }}>
                            {item.Item_image ? <img src={item.Item_image} style={{ maxHeight: 50, maxWidth: 50 }} alt="item" /> : <FolderIcon />}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText style={{ color: "black" }}
                        primary={item.Item_title ? item.Item_title : "Error Name"}
                        secondary={<span style={{ color: "white", backgroundColor: "black", borderRadius: "5px", padding: "3px" }}>{priceTitle(item)}</span>}
                    />
                    {/* disable until check box will be sync between cards and compare list */}
                    {/* <ListItemSecondaryAction
                        onClick={() => { removeItem(item) }}>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteForeverTwoToneIcon htmlColor="red" />
                        </IconButton>
                    </ListItemSecondaryAction> */}
                </ListItem>
            </div>
        )
    })

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xl={12} >
                    {/* <Typography variant="h6" className={classes.title}>
                        Items Added
                    </Typography> */}
                    <div className={show ? classes.demoShow : classes.demo}>
                        <List dense>
                            {list}
                        </List>
                    </div>
                </Grid>
            </Grid>
            {list.length > 0 &&
                <div>
                    <Fab
                        style={{
                            backgroundColor: "#fcaf17",
                            position: 'fixed',
                            bottom: '20px',
                            left: '30px',
                            zIndex: '99',
                        }}
                        onClick={() => setShow(!show)}
                        size="small"
                        aria-label="add">
                        <Badge badgeContent={list.length} color="primary">
                            <GiScales size={"2em"} style={{ float: "center", color: "saddlebrown" }} />
                        </Badge>
                    </Fab>
                    {/* <Fab
                        className={show && list.length > 1 ? classes.demoShow : classes.demo}
                        style={{
                            backgroundColor: "#fcaf17",
                            position: 'fixed',
                            bottom: '20px',
                            left: '80px',
                            zIndex: '99',
                        }}
                        lable="123"
                        onClick={() => handleCompare()}
                        size="small"
                        aria-label="compare"> */}
                    {/* <Badge
                            style={{ fontSize:"1px" }}
                            //component={<p>compare</p>}
                            badgeContent={<p>compare!</p>}
                            color="secondary"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}> */}
                    {/* <CompareTwoToneIcon lable="123" size={"2em"} style={{ float: "center", color: "saddlebrown" }} /> */}
                    {/* </Badge> */}
                    {/* </Fab> */}
                    <Button
                        variant="contained"
                        onClick={() => handleCompare()}
                        color="secondary"
                        className={show && list.length > 1 ? classes.demoShow : classes.demo}
                        style={{
                            backgroundColor: "#fcaf17",
                            position: 'fixed',
                            bottom: '20px',
                            left: '80px',
                            zIndex: '99',
                            borderRadius: "30px",
                            color: "saddlebrown"
                        }}
                        startIcon={<CompareTwoToneIcon lable="123" size={"2em"} style={{ float: "center", color: "saddlebrown" }} />}
                    >Compare</Button>

                    {/* <FCImagesGrid items={props.items} /> */}

                    <Dialog
                        open={open}
                        onClose={handleCloseCompare}
                        fullScreen={fullScreen}
                    >
                        {/* <DialogTitle id="compare">{"Items Compare"}</DialogTitle> */}
                        <DialogContent>
                            {/* <FCImagesGrid items={props.items} /> */}
                            <FCTableCompare items={props.items} />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => setOpen(false)} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }

        </div>
    );
}
