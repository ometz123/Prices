// import React, { createContext, useState } from 'react';

// export const ListsContext = createContext();

// const ListsContextProvider = (props) => {
//     const [tags, setTags] = useState(
//         [
//             //{ Tag_title: 'The Shawshank Redemption', Tag_id: 1994 }
//         ]
//     )
//     const fetchTags = () => {
//         //console.log("start fetch tags!");
//         let api = `https://localhost:44377/api/lists/GetTags`;
//         fetch(api)
//             .then(res => {
//                 return res.json();
//             })
//             .then(
//                 (result) => {
//                     console.log("fetch FetchGet= ", result);
//                     setTags(result);
//                 },
//                 (error) => {
//                     console.log("err post=", error);
//                 });
//     }
//     return (
//         <ListsContext.Provider value={{
//             tags,
//             SetTags: setTags,
//             FetchTags: fetchTags
//         }}>
//             {props.children}
//         </ListsContext.Provider>
//     );
// }
// export default ListsContextProvider;