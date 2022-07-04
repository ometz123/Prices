import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List, ListItem, Typography, Grid, IconButton,
  Avatar, ListItemAvatar, ListItemSecondaryAction, ListItemText
} from '@material-ui/core';
import { ReceiptContext } from '../../Contexts/ReceiptContext';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import FolderIcon from '@material-ui/icons/Folder';
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//import ListItemText from '@material-ui/core/ListItemText';
//import Avatar from '@material-ui/core/Avatar';
//import IconButton from '@material-ui/core/IconButton';
//import FormGroup from '@material-ui/core/FormGroup';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
//import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    placeContent: "center"
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
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



export default function InteractiveList(props) {
  const classes = useStyles();
  const { receipt, SetReceipt } = useContext(ReceiptContext);

  const removeItem = (e, i) => {
    if (window.confirm(`Are you sure you want to delete "${receipt.items[i].itemName}"?`)) {

      let items = receipt.items;
      //let pos = items.map((item) => { return item.id; }).indexOf(itemId);
      //console.log(i);
      items.splice(i, 1);

      SetReceipt({ ...receipt, items: items });

      // for (let i = 0; i < items.length; i++) {
      //   if (items[i].id === itemId) {
      //     items.splice(i, 1);
      //     SetReceipt({ ...receipt, items: items });
      //     break;
      //   }
      // }

      //SetReceipt({ ...receipt, items: receipt.items.splice(itemId, 1) });

    }
  }
  const editItem = (i) => {
    //console.log("edit");
    //console.log(receipt.items[i]);
    props.setItem2Edit(i);
  }
  let list = receipt.items.map((item, i) => {
    return (
      <div key={i} style={{ backgroundColor: "#fcaf17", borderRadius: "50px", margin: "2px" }}>
        <ListItem
          button
          onClick={() => editItem(i)}>
          <ListItemAvatar  >
            <Avatar style={{ border: "solid black 1px" }}>
              {item.image.preview ? <img src={item.image.preview} style={{ maxHeight: 50, maxWidth: 50 }} alt="preview" /> : <FolderIcon />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText style={{ color: "black" }}
            primary={item.itemName ? item.itemName : "Error Name"}
            secondary={<span style={{ color: "white", backgroundColor: "black", borderRadius: "5px", padding: "3px" }}>{item.price}$</span>}
          />
          <ListItemSecondaryAction >
            <IconButton onClick={(e) => { removeItem(e, i) }} edge="end" aria-label="delete" >
              <DeleteForeverTwoToneIcon htmlColor="red" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    )
  })

  return (
    <div className={classes.root} >
      <Grid container spacing={0} style={{ placeContent: "center" }}>
        <Grid item xl={12} >
          {/* <Typography variant="h6" className={classes.title}>
            Items List
          </Typography> */}
          <div className={classes.demo}>
            <List dense>
              {list}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
