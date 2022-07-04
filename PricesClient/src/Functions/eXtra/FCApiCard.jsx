import React, { useEffect, useState } from 'react';
import FCImagesGrid from './FCImagesGrid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { CardContent, CardActions, Collapse, IconButton, Typography, CardHeader,Card } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ControlPointTwoToneIcon from '@material-ui/icons/ControlPointTwoTone';
//import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
//import CardMedia from '@material-ui/core/CardMedia';
//import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
//import Collapse from '@material-ui/core/Collapse';
//import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import ShareIcon from '@material-ui/icons/Share';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import FCCheckBox2Compare from './FCCheckBox2Compare'
//import { Chip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        margin: 20,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function FCApiCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [src, setSrc] = useState("");
    const [fullDetails, setFullDetails] = useState("");
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleItemFromAPI = () => {
        if (src !== "") {
            props.addItem(props.item, src)
        } else {
            alert("Please choose an image")
        }
    }
    useEffect(() => {
        let list = [];
        let details = { title: "", info: "" }
        const detailsToHide = ["lowest_recorded_price", "highest_recorded_price", "images", "offers"]
        for (const key in props.item) {
            if (props.item.hasOwnProperty(key) && !detailsToHide.includes(key)) {
                const element = props.item[key];
                //console.log(element);
                details.title = key;
                details.info = element;
                list.push(<Typography key={key} paragraph>{details.title}: {details.info}</Typography>);
            }
        }
        setFullDetails(list)
    }, [])
    return (
        <Card className={classes.card}  >
            <CardHeader title={props.item.title} />
            <CardContent>
                <FCImagesGrid images={props.item.images} setSrc={setSrc} />
            </CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.item.description}
            </Typography>
            <CardActions disableSpacing>
                <IconButton
                    onClick={() => { handleItemFromAPI() }}
                    aria-label="Item from API"
                    color={"primary"}
                >
                    <ControlPointTwoToneIcon /> Yes
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"

                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {fullDetails}
                </CardContent>
            </Collapse>
        </Card>
    );
}
