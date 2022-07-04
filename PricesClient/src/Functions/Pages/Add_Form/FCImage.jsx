import React, { useState, useContext, useEffect } from 'react'
import { ReceiptContext } from '../../../Contexts/ReceiptContext';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import {/* Paper,*/ Chip, Avatar } from '@material-ui/core';

export default function FCImage(props) {
  //const [image, setImage] = useState({ preview: '', raw: '' })
  const { receipt, SetReceipt/*, item, SetItem */ } = useContext(ReceiptContext);
  const [icon, setIcon] = useState();
  const [image, setImage] = useState({ image: { preview: null, raw: null } });

  const handleChange = (e) => {
    let image = e.target.files[0];
    if (image !== undefined) {
      let preview = URL.createObjectURL(image);
      setImage({
        preview: preview,
        raw: image
      });

      //  create 64 base  
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        let base64 = reader.result;

        if (props.parent === "Receipt") {
          SetReceipt({
            ...receipt, image: {
              preview: preview,
              raw: image,
              base64: base64
            }
          })
        } else if (props.parent === "Item") {
          props.onItemImageChange(image, base64);
        }
      }
    }
    //
  }

  useEffect(() => {
    if (props.parent === "Item") { setIcon(<PhotoCameraIcon color="primary" />) }
    else if (props.parent === "Receipt") { setIcon(<ReceiptOutlinedIcon />) }
  }, [image]);
  useEffect(() => {
    if (props.image) {
      setImage(props.image);
    }
  }, []);

  return (
    <div>
      <label >
        {image.preview ?
          <img src={image.preview} style={{ maxWidth: 250, maxHeight: 250 }} alt={props.parent + " image"} /> :
          (
            // <>
            //   <span className="fa-stack fa-2x mt-3 mb-2">
            //     <i className="fas fa-circle fa-stack-2x" />
            //     <i className="fas fa-store fa-stack-1x fa-inverse" />
            //   </span>

            //   {/* <h5 className="text-center"><ReceiptOutlinedIcon/> Add Receipt   </h5> */}
            //   <p className="text-center">
            //     {icon} {props.parent} <AnnouncementOutlinedIcon htmlColor="red" />
            //   </p>
            // </>
            <div>

              <Chip
                label={props.parent}
                variant="outlined"
                color="primary"
                //deleteIcon={<AnnouncementOutlinedIcon color="action" />}
                avatar={<Avatar style={{ backgroundColor: "inherit" }}>{icon}</Avatar>}
              /><AnnouncementOutlinedIcon color="secondary" />
            </div>

          )
        }<input
          type="file"
          name={props.parent}
          style={{ display: 'none', border: "5px solid red" }}
          onChange={handleChange}
          required={props.parent === "Receipt"}
          accept="image/*"
        />
      </label>

      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  )
}