import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
export const ReceiptContext = createContext();

const ReceiptContextProvider = (props) => {
    const [receipt, setReceipt] = useState({
        image: { preview: "", raw: "", base64: "" },
        date: new Date(),
        discoundDollar: "",
        discountPercent: "",
        store: { name: "", lat: "", lon: "" },
        items: [],//[{ name: "omer", id: 1 }, { name: "tzafrir", id: 2 }],
        receiptDescription: "",
    })
    const [item, setItem] = useState({
        id: "",
        category: { id: 0, title: "" },
        subCategory: { id: 0, title: "" },
        itemName: "",
        barcode: "",
        image: { preview: "", raw: "", base64: "" },
        discoundDollar: 0,
        discountPercent: 0,
        tags: [],
        itemDescription: "",
        price: "",
        Id_type: "UserUser"
    })
    const [tag, setTag] = useState({ id: 0, title: "" })
    // useEffect(() => {
    //     localStorage.setItem('receipt', JSON.stringify(receipt));
    // }, [receipt]);
    return (
        <ReceiptContext.Provider value={{
            receipt,
            item,
            tag,
            SetReceipt: setReceipt,
            SetItem: setItem,
            SetTag: setTag
        }}>
            {props.children}
        </ReceiptContext.Provider>
    );
}
export default ReceiptContextProvider;
