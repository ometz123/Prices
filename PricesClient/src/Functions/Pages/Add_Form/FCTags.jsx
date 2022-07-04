/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchContext } from '../../../Contexts/SearchContext';
import { ListsContext } from '../../../Contexts/ListsContext';

export default function FCTags(props) {
  // const handleTagsAdd = (tags) => {
  //   props.handleTags(tags)
  // }
  const { search, setSearch } = useContext(SearchContext);
  const { tags } = useContext(ListsContext)
  return (
    <div>
      <Autocomplete
        multiple
        id="fixed-tags-demo"
        options={tags}
        getOptionLabel={(option) => option.Tag_title}
        //onChange={(e, tags) => handleTagsAdd(tags)}
        onChange={(e, tags) => setSearch({
          ...search, tags: tags
        })}
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
          <TextField {...params} label="Tags" variant="outlined" placeholder="Tags"
          InputLabelProps={{
            style: { color: 'white', },
          }}
          style={{
            color: 'white',
            border: "solid white 1px",
          }}
          InputProps={{ ...params.InputProps,/* ...classes.input*/style:{color:props.color?props.color:"default"} }}

          //inputProps={{style:{color: 'white'}}}
          // InputProps={{
          //   style: {
          //     color: 'white',
          //     //border: "solid white 1px",
          //   }
          // }
          //}
          />
        )}
      />
    </div>
  );
}

