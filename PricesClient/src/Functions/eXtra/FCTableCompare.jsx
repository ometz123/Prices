import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
//import Paper from '@material-ui/core/Paper';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(image, name, price, description, distance, store, discountDollar, discountPercent, barcode) {
    return { image, name, price, description, distance, store, discountDollar, discountPercent, barcode };
}



export default function FCTableCompare(props) {
    const classes = useStyles();
    let tempRows = [];
    const [rows, setRows] = useState([]);

    let priceTitle = (item) => {
        let defauldPrice = item.Price + "$";
        if (item.Discount_dollar > 0 || item.Discount_percent > 0) {
            return <><span style={{ textDecorationLine: "line-through" }}>{defauldPrice}</span>&#160;&nbsp;&nbsp;&nbsp;{`${((item.Price - item.Discount_dollar) * (1 - item.Discount_percent / 100))}$`}</>;
        } else {
            return defauldPrice;
        }
    }
    useEffect(() => {
        for (let i = 0; i < props.items.length; i++) {
            tempRows.push(createData(
                props.items[i].Item_image,
                props.items[i].Item_title,
                priceTitle(props.items[i]),
                props.items[i].Item_Description,
                (props.items[i].Distance).toFixed(2),
                props.items[i].Store_name,
                props.items[i].Discount_dollar,
                props.items[i].Discount_percent,
                props.items[i].Barcode)
            );

        }
        //console.log(tempRows, props.items);
        setRows(tempRows)
    }, [props.items])
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Distance&nbsp;(km)</TableCell>
                        <TableCell align="right">Store</TableCell>
                        <TableCell align="right">Discount&nbsp;($)</TableCell>
                        <TableCell align="right">Discount&nbsp;(%)</TableCell>
                        <TableCell align="right">Barcode</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                <Avatar style={{ border: "solid black 1px" }}>
                                    {row.image ? <img src={row.image} style={{ maxHeight: 50, maxWidth: 50 }} alt="item" /> : <FolderIcon />}
                                </Avatar>
                            </TableCell>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.distance}</TableCell>
                            <TableCell align="right">{row.store}</TableCell>
                            <TableCell align="right">{row.discountDollar}</TableCell>
                            <TableCell align="right">{row.discountPercent}</TableCell>
                            <TableCell align="right">{row.barcode > 0 ? row.barcode : <img src={"https://visualpharm.com/assets/84/No%20Barcode-595b40b85ba036ed117ddb93.svg"} alt="no barcode" />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
