import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ReceiptContext } from '../../../Contexts/ReceiptContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            //width: '25ch',
        },
    },
}));

export default function FCDescriptions(props) {
    const classes = useStyles();
    const { receipt, SetReceipt } = useContext(ReceiptContext)
    //const [value/*, setValue*/] = React.useState();

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    return (
        <div className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-multiline-static"
                label="Description:"
                multiline
                rows="4"
                value={receipt.receiptDescription}
                onChange={e => SetReceipt({ ...receipt, receiptDescription: e.target.value })}
                //defaultValue="Default Value"
                variant="outlined"
                //color="white"
                // inputProps={{
                //     style: { color: props.color?props.color:null }
                // }

                // }
                // InputLabelProps={{
                //     style: { color: props.color?props.color:null }
                // }}
                InputLabelProps={{
                    style: { color: 'white', },
                }}
                
                InputProps={{
                    style: {
                        color: 'white',
                        border: "solid white 1px",
                    }
                }}
            />
        </div>
    );
}
