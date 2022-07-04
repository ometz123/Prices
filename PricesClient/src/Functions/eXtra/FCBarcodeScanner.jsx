// import React,{ useState } from 'react'
// import BarcodeReader from 'react-barcode-reader'


// export default function FCBarcode(props) {
//     const [result, SetResult] = useState('No result');

//     const handleScan = (data) => {
//         SetResult(data)
//     }
//     const handleError = (err) => {
//         console.error(err)
//     }

//     return (
//         <div>
//             <BarcodeReader
//                 onError={handleError}
//                 onScan={handleScan}
//             />
//             <p>{result}</p>
//         </div>
//     )
// }