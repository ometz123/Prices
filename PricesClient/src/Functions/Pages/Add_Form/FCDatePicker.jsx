import React, { useState/*, useContext*/ } from "react";
import { DatePicker } from "@material-ui/pickers";
//import lightBlue from "@material-ui/core/colors/lightBlue";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useEffect } from "react";
//import { ReceiptContext } from "../../../Contexts/ReceiptContext";


const theme = createMuiTheme({
    overrides: {
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: purple[50],
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#11cb5f',
            },
        },
        datePicker: {
            color: '#fff',
            // textColor: palette.alternateTextColor,
            // calendarTextColor: palette.textColor,
            // selectColor: palette.primary2Color,
            // selectTextColor: palette.alternateTextColor,
            // calendarYearBackgroundColor: palette.canvasColor,
            // headerColor: palette.pickerHeaderColor || palette.primary1Color,
        },
    }
});

export default function FCDatePicker(props) {
    //const [selectedDate, handleDateChange] = useState(new Date());
    //const { receipt, SetReceipt } = useContext(ReceiptContext);
    const [selectedDate, handleDateChange] = useState(new Date());
    const onDateChange = (e) => {
        props.onDateChange(e)
        handleDateChange(e)
    }
    useEffect(() => { props.date && handleDateChange(props.date) }, [])
    //const [selectedDate, handleDateChange] = useState(null);
    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <ThemeProvider theme={theme}>
                <DatePicker
                    autoOk
                    label={props.title ? props.title : "Receipt Date"}
                    //clearable
                    required={props.req ? props.req : false}
                    disableFuture
                    inputVariant="outlined"
                    //value={receipt.date}
                    value={selectedDate}
                    //onChange={(e)=>SetReceipt({...receipt,date:e})}
                    onChange={e => onDateChange(e)}
                    margin="normal"
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
            </ThemeProvider >
        </MuiPickersUtilsProvider>
    );
}
