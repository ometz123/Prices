import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {

    const [search, setSearch] = useState({
        text: "",
        placeId: null,
        lat: 32.658456,
        lng: 35.580300,
        //location=null,
        tags: [],
        distance: 2,
        minPrice: 0,
        maxPrice: 100,
    })

    return (
        <SearchContext.Provider value={{
            search,
            setSearch: setSearch,
        }}>
            {props.children}
        </SearchContext.Provider>
    );
}
export default SearchContextProvider;
