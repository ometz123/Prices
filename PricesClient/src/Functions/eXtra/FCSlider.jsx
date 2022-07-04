import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { SearchContext } from '../../Contexts/SearchContext';
import { Checkbox, FormControlLabel, FormHelperText } from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    //width: 300,
    margin: "0px 10%",
  },
});

function valuetext(value) {
  return `${value}$`;
}

export default function FCSlider(props) {
  const classes = useStyles();
  //const [range, setValue] = React.useState([20, 30]);
  //const [distance, setDistance] = React.useState([20]);
  const { search, setSearch } = useContext(SearchContext);
  const [over100, setOver100] = useState(false)
  const handlePriceRangeChange = (event, newValue) => {
    setSearch({
      ...search,
      minPrice: newValue[0],
      maxPrice: over100 ? "max" : newValue[1]
    });

    //setValue(newValue);
    //props.handlePriceRange(newValue);
  };
  const handleDistanceChange = (e, newdistance) => {
    //setDistance(newdistance);
    setSearch({
      ...search, distance: newdistance
    });
  }
  const handleOver100 = () => {
    setOver100(!over100);
    setSearch({
      ...search,
      maxPrice: over100 ? 100 : "max"
    });
  }
  // useEffect(() => {
  //   console.log(over100, search.maxPrice);
  // }, [over100, search.maxPrice]);
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Maximum Distance {search.distance} km.

      </Typography>
      <Slider
        value={search.distance}
        onChange={handleDistanceChange}
      />
      <Typography id="range-slider" gutterBottom>
        Price range {search.minPrice}- {search.maxPrice} $
      </Typography>
      <FormControlLabel
        value="start"
        control={<Checkbox style={{ color: "#fcaf17" }} />}
        label={<FormHelperText style={{ color: "#fcaf17" }}>Over 100</FormHelperText>}
        labelPlacement="start"
        checked={over100}
        onChange={handleOver100}
      />
      <Slider
        value={[search.minPrice, search.maxPrice == 'max' ? 100 : search.maxPrice]}
        disabled={over100}
        onChange={handlePriceRangeChange}
        //valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
