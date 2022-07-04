import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const MyCheckbox = withStyles({
  root: {
    color: "#fcaf17",//green[400],
    '&$checked': {
      color: "#fcaf17"//green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function FCCheckBox2Compare(props) {
  const [state, setState] = React.useState({
    //checkedA: true,
    //checkedB: true,
    //checkedF: true,
    checkedG: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    props.onChange(event.target.checked)
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <MyCheckbox
            checked={state.checkedG}
            onChange={handleChange('checkedG')}
            value="checkedG"
          />
        }
        label="Compare"
      />
    </FormGroup>
  );
}