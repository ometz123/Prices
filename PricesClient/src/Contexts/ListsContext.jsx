import React, { createContext, useState } from 'react';

export const ListsContext = createContext();

const ListsContextProvider = (props) => {
    let local = true;
    let http = `http://proj.ruppin.ac.il/bgroup4/prod/server/api/`;
    if (local) {
        http = `https://localhost:44377/api/`;
    }

    const [tags, setTags] = useState(
        [
            //{ Tag_title: 'The Shawshank Redemption', Tag_id: 1994 }
        ]
    )
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [stores, setStores] = useState([]);
    const fetchTags = () => {
        //console.log("start fetch tags!");
        let api = http + `lists/GetTags`;

        fetch(api)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    //console.log("Tags fetch= ", result);
                    setTags(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    const fetchCategories = () => {
        //console.log("start fetch tags!");
        let api = http + `lists/GetCategories`;

        fetch(api)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    //console.log("Categories fetch= ", result);
                    setCategories(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    const fetchSubCategories = () => {
        //console.log("start fetch tags!");
        //let api = `https://localhost:44377/api/lists/GetSubCategories`;
        let api = http + `lists/GetSubCategories`;

        fetch(api)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    //console.log("SubCategories fetch= ", result);
                    setSubCategories(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    const fetchStores = () => {
        let api = http + `lists/GetStores`;
        fetch(api)
            .then(res => {
                return res.json();
            })
            .then(
                (result) => {
                    //console.log("stores fetch= ", result);
                    setStores(result);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    return (
        <ListsContext.Provider value={{
            tags,
            SetTags: setTags,
            FetchTags: fetchTags,
            categories,
            SetCategories: setCategories,
            FetchCategories: fetchCategories,
            subCategories,
            SetSubCategories: setSubCategories,
            FetchSubCategories: fetchSubCategories,
            stores,
            FetchStores: fetchStores
        }}>
            {props.children}
        </ListsContext.Provider>
    );
}
export default ListsContextProvider;