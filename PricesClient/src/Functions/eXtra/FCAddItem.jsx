import React, { useContext, useState, useEffect } from 'react';
import { ReceiptContext } from '../../Contexts/ReceiptContext';
import { ListsContext } from '../../Contexts/ListsContext';
import FCImage from '../Pages/Add_Form/FCImage';
import FCApiCard from './FCApiCard';
import FCBarcode from './FCBarcode';
import { Button, Dialog, Chip, TextField, DialogActions, Avatar, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddCircleOutlineRounded from '@material-ui/icons/AddCircleOutlineRounded';
import { green } from '@material-ui/core/colors';
//import { IconButton, InputAdornment, OutlinedInput, InputLabel } from '@material-ui/core';
//import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
//import FCCard from './FCCard';
//import Button from '@material-ui/core/Button';
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
//import TextField from '@material-ui/core/TextField';
//import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
//import FCTags from '../Pages/Add_Form/FCTags';
//import Chip from '@material-ui/core/Chip';
//import FCDescriptions from '../Pages/Add_Form/FCDescriptions';

export default function FCAddItem(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const [tempBarcode, SetTempBarcode] = useState("");
    const filter = createFilterOptions();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const { receipt, SetReceipt } = useContext(ReceiptContext);
    const { tags, FetchTags, categories, FetchCategories, subCategories, FetchSubCategories } = useContext(ListsContext)
    const [itemsFromApi, SetItemsFromApi] = useState(null);
    const [selectedItemFromApi, setSelectedItemFromApi] = useState(null);
    const [apiMenu, SetApiMenu] = useState(false);
    const [useApiData, setUseApiData] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [valid, setValid] = useState(false);
    //const [useItem2Edit, setUseItem2Edit] = useState(false);
    //const [defaultCategory, setDefaultCategory] = useState({ Category_id: "", Category_title: "" });
    //const [defaultSubCategory, setDefaultSubCategory] = useState({ Category_id: "", Category_title: "" });

    const [tempItem, setTempItem] = useState({
        id: "",
        category: { id: 0, title: "" },
        subCategory: { id: 0, title: "" },
        itemName: "",
        barcode: "",
        image: { preview: "", raw: "", base64: "" },
        discoundDollar: "",
        discountPercent: "",
        tags: [],
        itemDescription: "",
        price: "",
        Id_type: "UserUser"
    })
    const handleClickOpen = () => {
        setOpen(true);
        setTempItem({
            id: "",
            category: { id: 0, title: "" },
            subCategory: { id: 0, title: "" },
            itemName: "",
            barcode: "",
            image: { preview: "", raw: "", base64: "" },
            discoundDollar: "",
            discountPercent: "",
            tags: [],
            itemDescription: "",
            price: "",
            Id_type: "UserUser"
        });

    };
    const handleClose = () => {
        console.log("tempItem: ", tempItem);
        if (window.confirm("Are you sure all the fields are correct?")) {
            console.log(props.item2Edit);
            if (props.item2Edit != null) {
                console.log(props.item2Edit);
                let items = receipt.items;
                items.splice(props.item2Edit, 1);
                SetReceipt({ ...receipt, items: items });
                props.setItem2Edit(null);
            }
            if (tempItem.price !== '') {
                for (let i = 0; i < tempItem.tags.length; i++) {
                    if (tempItem.tags[i].inputValue !== undefined) {
                        tempItem.tags[i] = { title: tempItem.tags[i].inputValue }
                    }
                }
                SetReceipt({ ...receipt, items: [...receipt.items, tempItem] });
            }
            setOpen(false);
            //setUseApiData(false);
            setTempItem({
                id: "",
                category: { id: 0, title: "" },
                subCategory: { id: 0, title: "" },
                itemName: "",
                barcode: "",
                image: { preview: "", raw: "", base64: "" },
                discoundDollar: "",
                discountPercent: "",
                tags: [],
                itemDescription: "",
                price: ""
            })
            SetApiMenu(false);
            setUseApiData(false);
            //setFetching(false);
            //setUseItem2Edit(false);
        }
    };
    const handleCancel = () => {
        //setFetching(false);
        setOpen(false);
        setUseApiData(false);
        props.setItem2Edit(null);
    }
    //#region  handleItemEvents

    const handleCategoryChange = (category) => {
        //console.log(1, category);
        //setDefaultCategory(category);
        if (category) {
            if (category.Category_id) {
                setTempItem({ ...tempItem, category: category });
            } else if (category.inputValue) {
                setTempItem({ ...tempItem, category: { title: category.inputValue.trim() } });
            } else if (typeof category === "string") {
                //console.log("new from api: ", category.trim());
                //let newCategory = { title: "" };
                let newCategory = { title: category.trim() };
                setTempItem({ ...tempItem, category: newCategory });
            }
        } else {
            //console.log("clear: ", category);
            //setUseItem2Edit(false);
            setTempItem({ ...tempItem, category: category });
        }
    }
    const handleSubCategoryChange = (subCategory) => {
        console.log(1, subCategory);
        if (subCategory) {
            if (subCategory.Sub_category_id) {
                setTempItem({ ...tempItem, subCategory: subCategory });
            } else if (subCategory.inputValue) {
                setTempItem({ ...tempItem, subCategory: { title: subCategory.inputValue.trim() } });
            } else if (typeof subCategory === "string") {
                //console.log("new from api: ", subCategory.trim());
                let newSubCategory = { title: subCategory.trim() };
                setTempItem({ ...tempItem, subCategory: newSubCategory });
            }
            //let newSubCategory = { title: "" };
            //newSubCategory = { title: subCategory.inputValue };
            //setTempItem({ ...tempItem, subCategory: newSubCategory });
        } else {
            //console.log("clear: ", subCategory);
            setTempItem({ ...tempItem, subCategory: subCategory });
        }
    }
    const handleItemImage = (imageSrc, base64) => {
        //console.log(imageSrc);
        setTempItem({
            ...tempItem, image: {
                preview: tempItem.Id_type === "src" ? imageSrc : URL.createObjectURL(imageSrc),
                raw: imageSrc,
                base64: base64
            }
        })
        //base64 === "src" ? setUseApiData(true) : setUseApiData(false)
        //setUrl(imageSrc);


    }
    const handleItemNameChange = (itemName) => {
        setTempItem({ ...tempItem, itemName: itemName });
    }
    const handleItemPriceChange = (itemPrice) => {
        setTempItem({ ...tempItem, price: itemPrice });
    }
    const handleItemDollarDiscountChange = (dollar) => {
        setTempItem({ ...tempItem, discoundDollar: dollar });
    }
    const handleItemPercentDiscountChange = (percent) => {
        setTempItem({ ...tempItem, discountPercent: percent });
    }
    const handleItemDescriptionChange = (description) => {
        setTempItem({ ...tempItem, itemDescription: description });
        setSelectedItemFromApi({ ...selectedItemFromApi, description: description })
    }
    const handleTagsChange = (tags) => {
        //console.log("tags: ", tags);
        setTempItem({ ...tempItem, tags: tags });
    }
    const handleBarcode = (barcode) => {
        //console.log(barcode);

        //SetApiMenu(true)
        // SetItemsFromApi(baltoro.items.map(item => {
        //     return <FCApiCard item={item} key={item.ean} addItem={useItemFromApi} />
        // }))

        let corsAnywhere = `https://cors-anywhere.herokuapp.com/`;
        let api = 'https://api.upcitemdb.com/prod/trial/lookup?upc=';
        //let request = new Request('https://api.upcitemdb.com/prod/trial/lookup?upc=7290000066318');
        //let randomUser = new Request(`https://api.randomuser.me/?results=5`);
        //let params = [`UPC`, `ISBN`, `EAN`];
        //console.log("Start fetch");
        setTempItem({ ...tempItem, barcode: barcode });
        setFetching(true);
        //#region 
        fetch(corsAnywhere + api + barcode, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                //console.log('res=', res);
                //console.log('res.status', res.status);
                //console.log('res.ok', res.ok);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch FetchGet= ", result);
                    setFetching(false)
                    if (result.code === "OK") {
                        if (result.total > 0) {
                            SetApiMenu(true);
                            SetItemsFromApi(result.items.map(item => {
                                return <FCApiCard item={item} key={item.ean} addItem={useItemFromApi} />
                            }))
                        } else { alert(`Sorry, the system doesn't know this item.\nPlease upload it manually :)`) }
                    }
                    else { alert(result.message ? `Sorry, Server says: "${result.message}"` : `Sorry, something went wrong`) }
                },
                (error) => {
                    console.log("err post=", error);
                    setFetching(false)
                });
        //#endregion
        //console.log("End fetch");
    }
    //#endregion

    const editItem = (i) => {
        //console.log("editItem", i);
        console.log("editItem: ", receipt.items[i]);
        setOpen(true);
        setTempItem({
            ...tempItem,
            id: receipt.items[i].id,
            itemName: receipt.items[i].itemName,
            image: receipt.items[i].image,
            barcode: receipt.items[i].barcode,
            price: receipt.items[i].price,
            discoundDollar: receipt.items[i].discoundDollar,
            discountPercent: receipt.items[i].discountPercent,
            category: receipt.items[i].category,
            subCategory: receipt.items[i].subCategory,
            itemDescription: receipt.items[i].itemDescription,
            Id_type: receipt.items[i].Id_type,
            tags: receipt.items[i].tags,
        });
    }
    const useItemFromApi = (item, src) => {
        setFetching(false);
        //console.log(item, src);

        setUseApiData(true);
        SetApiMenu(false);
        setSelectedItemFromApi(item);
        let category = { title: "" };
        let subCategory = { title: "" };
        if (item.category.split(">")[0]) {
            category = categories.find(o => o.Category_title === item.category.split(">")[0].trim());
            if (item.category.split(">")[1]) {
                console.log(item.category.split(">")[1]);
                subCategory = subCategories.find(o => o.SubCategory_title === item.category.split(">")[1].trim());
            }
        }
        setTempItem({
            ...tempItem,
            itemName: item.title,
            image: { ...tempItem.image, preview: src },
            category: category ? category : { title: item.category.split(">")[0].trim() },
            subCategory: subCategory ? subCategory : { title: item.category.split(">")[1].trim() },
            itemDescription: item.description,
            Id_type: "src"
        })
    }
    useEffect(() => {
        //window.scrollTo(0, 0)
        FetchTags();
        FetchCategories();
        FetchSubCategories();
    }, []);
    useEffect(() => {
        setTempItem({ ...tempItem, barcode: tempBarcode });
    }, [tempBarcode]);
    useEffect(() => {
        if (props.item2Edit !== null) {
            editItem(props.item2Edit);//index of item in receipt
            setUseApiData(receipt.items[props.item2Edit].Id_type === "src");
            //setUseItem2Edit(true);
            //setDefaultCategory(receipt.items[props.item2Edit].category);
        }
    }, [props.item2Edit]);
    useEffect(() => {
        if (tempItem.itemName && tempItem.price) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [tempItem])
    return (
        <div>
            <Chip
                label={"Add Item"}
                variant="outlined"
                color={"primary"}
                style={{ float: "none" }}
                onClick={handleClickOpen}
                avatar={<Avatar style={{ backgroundColor: "inherit", color: green[500] }}><AddCircleOutlineRounded /></Avatar>}
            />
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Add Item"}</DialogTitle>
                <div>
                    <DialogContent>
                        <DialogContentText>
                            Item Details
                    </DialogContentText>
                        <div style={{ float: "left" }} >
                            <FCBarcode
                                onBarcodeChange={e => SetTempBarcode(e.target.value)}
                                onIconClick={() => { handleBarcode(tempBarcode) }}
                                val={tempItem.barcode}
                                fetching={fetching}
                            />
                            <Dialog
                                fullScreen={fullScreen}
                                open={apiMenu}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <div style={{ textAlign: "-webkit-center" }}>
                                    <DialogTitle id="responsive-dialog-title">{"Is this your Item?"}</DialogTitle>
                                    <DialogContent>
                                        {itemsFromApi}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={() => SetApiMenu(false)} color="primary">
                                            Exit
                                    </Button>
                                    </DialogActions>
                                </div>
                            </Dialog>
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left" }} >
                            {useApiData ?
                                <img
                                    src={tempItem.image.preview}
                                    style={{ maxWidth: 250, maxHeight: 250 }}
                                    alt={"Item"}
                                /> :
                                <FCImage
                                    parent={"Item"}
                                    onItemImageChange={(image, base64) => handleItemImage(image, base64)}
                                    image={tempItem.image}
                                />}
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left", width: "300px" /*maxWidth: 300*/ }}>
                            <Autocomplete
                                id="combo-box-category"
                                options={categories}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            Category_title: `New Category: "${params.inputValue}"`,
                                        });
                                    }
                                    //console.log("filteredC: ", filtered);
                                    return filtered;
                                }}
                                //defaultValue={defaultCategory}
                                //value={tempItem.category}
                                //inputValue={useItem2Edit ? tempItem.category.Category_title : null}
                                //defaultValue={tempItem.category.id!=0?{id:tempItem.category.id,title:tempItem.category.title}:null}
                                //defaultValue={!useItem2Edit ? { Category_id: tempItem.category.id, Category_title: tempItem.category.title } : null}
                                //placeholder={"שדג"}
                                disabled={useApiData}
                                onChange={(e, category) => handleCategoryChange(category)}
                                getOptionLabel={(option) => option.Category_title}
                                renderInput={(params) => <TextField {...params}
                                    label={useApiData ? selectedItemFromApi.category.split(">")[0] : "Category"}
                                    variant="outlined" />}
                            />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left", width: "300px" /*maxWidth: 300*/ }}>
                            <Autocomplete
                                id="combo-box-sub-category"
                                options={subCategories}
                                onChange={(e, subCategory) => handleSubCategoryChange(subCategory)}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            Sub_category_title: `New Sub Category: "${params.inputValue}"`,
                                        });
                                    }
                                    //console.log("filteredSC: ", filtered);
                                    return filtered;
                                }}
                                disabled={useApiData}
                                getOptionLabel={(option) => option.Sub_category_title}
                                renderInput={(list) => <TextField {...list}
                                    label={useApiData ? selectedItemFromApi.category.split(">")[1] : "Sub Category"}
                                    //value={tempItem.subCategory}
                                    variant="outlined" />}
                            />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left" }}>
                            <TextField
                                label={"Item Name"}
                                //value={useApiData ? selectedItemFromApi.title : ""}
                                disabled={useApiData}
                                onChange={e => handleItemNameChange(e.target.value)}
                                variant="outlined"
                                value={tempItem.itemName}
                            //InputProps={{ style: { width: "400px" } }}
                            />
                            <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />

                            <TextField
                                label="Item Price"
                                onChange={e => handleItemPriceChange(e.target.value)}
                                variant="outlined"
                                value={tempItem.price}
                                //InputProps={{ style: { width: "400px" } }}
                                type="number" />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div style={{ float: "left" }}>
                            <TextField
                                id="standard-basic-Dollar"
                                label="$ Discount"
                                value={tempItem.discoundDollar}
                                onChange={(e) => handleItemDollarDiscountChange(e.target.value)}
                                variant="outlined"
                                //InputLabelProps={{ style: { color: props.color ? props.color : null }, }}
                                //InputProps={{
                                //style: { color: props.color ? props.color : null },
                                //disableUnderline: "true",
                                //minimum: 0,max:tempItem.price
                                //}}
                                type="number"
                            />
                            <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                            <TextField
                                id="standard-basic-percent"
                                label="% Discount"
                                variant="outlined"
                                value={tempItem.discountPercent}
                                onChange={(e) => handleItemPercentDiscountChange(e.target.value)}
                                color="primary"
                                //InputLabelProps={{ style: { color: props.color ? props.color : null } }}
                                //InputProps={{
                                //style: { color: props.color ? props.color : null },
                                //}}
                                type="number"
                            />
                        </div>
                        <br style={{ clear: "both" }} /><br style={{ clear: "both" }} />
                        <div>
                            <Autocomplete
                                multiple
                                id="fixed-tags-demo"
                                options={tags}
                                getOptionLabel={(option) => option.Tag_title}
                                onChange={(e, tags) => handleTagsChange(tags)}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            Tag_title: `New Tag: "${params.inputValue}"`,
                                        });
                                    }
                                    //console.log("filtered: ", filtered);
                                    return filtered;
                                }}
                                //defaultValue={[top100Films[6], top100Films[13]]}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            label={option.Tag_title}
                                            {...getTagProps({ index })}
                                        //disabled={index === 0}
                                        />
                                    ))
                                }
                                style={{ maxWidth: 400 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tags" variant="outlined" placeholder="Tags" />
                                )}
                            />
                            <br style={{ clear: "both" }} />

                            <TextField
                                id="outlined-multiline-static"
                                label="Description:"
                                multiline
                                rows="4"
                                //value={receipt.receiptDescription}
                                onChange={e => handleItemDescriptionChange(e.target.value)}
                                //defaultValue="Default Value"
                                variant="outlined"
                                value={useApiData ? selectedItemFromApi.description : tempItem.itemDescription}
                                //color="white"
                                inputProps={{
                                    style: { color: props.color ? props.color : null }
                                }
                                }
                                InputLabelProps={{
                                    style: { color: props.color ? props.color : null }
                                }}
                            //style={{ maxWidth: 400 }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCancel} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={handleClose} color="primary" autoFocus
                            disabled={!valid}>
                            Add
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

