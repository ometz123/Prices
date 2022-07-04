import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ReceiptContext } from '../../../Contexts/ReceiptContext';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            //width: '25ch',
        },
    },
}));

export default function FCDiscount(props) {
    const classes = useStyles();
    const { receipt,SetReceipt } = useContext(ReceiptContext);

    return (
        <div className={classes.root} noValidate autoComplete="off">
            <TextField
                id="standard-basic-Dollar"
                label="$ Discount"
                //color="primary"
                value={receipt.discoundDollar}
                onChange={(e)=>SetReceipt({...receipt,discoundDollar:e.target.value})}
                variant="outlined"
                InputLabelProps={{
                    style: { color: props.color ? props.color : null },
                }}
                InputProps={{
                    style: {
                        color: props.color ? props.color : null,
                        border:props.color ? props.color+" 1px solid" : null
                    },
                    //disableUnderline: "true",
                    minimum: "0", max: "10", step: "1"

                }}
                type="number"

            />
            <br />
            <TextField
                id="standard-basic-percent"
                label="% Discount"
                variant="outlined"
                value={receipt.discountPercent}
                onChange={(e)=>SetReceipt({...receipt,discountPercent:e.target.value})}
                color="primary"
                InputLabelProps={{
                    style: { color: props.color ? props.color : null }
                }}
                InputProps={{
                    style: {
                        color: props.color ? props.color : null,
                        border:props.color ? props.color+" 1px solid" : null
                    },
                }}
                type="number"
            />
        </div>
    );
}
