import React,{ useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import { Radio, colors } from '@material-ui/core';
// import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
//import tileData from './tileData';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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
}));

export default function FCImagesGrid(props) {
  const classes = useStyles();
  //const [color, setColor] = useState(false);
  const [sorce, setSorce] = useState("");
  //const corsAnywhere = `https://cors-anywhere.herokuapp.com/`;

  const handleLike = (src) => {
    //console.log("src: ", src);
    //setColor(!color);
    src !== sorce ? setSorce(src) : setSorce("");
    //props.setSrc(src);
  }
  useEffect(() => {
    props.setSrc(sorce);
    //console.log(props);
  }, [sorce])//???

  return (
    <div className={classes.root}>
      Please select the best image:
      <GridList className={classes.gridList} cols={2.5}>
        {props.images.map((src) => (
          <GridListTile key={src}>
            <img src={src} alt="item" />
            {/* <input type="radio" name="best-image"style={{position: "absolute", top: "10px"}} onClick={() => handleLike(src)} /> */}

            <GridListTileBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton
                  onClick={() => handleLike(src)}
                  //className={classes.title}
                  //aria-label="best image"
                  color={sorce === src ? 'secondary' : 'primary'}
                  style={{ position: "absolute", top: "10px" }}
                >
                  <FavoriteIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
