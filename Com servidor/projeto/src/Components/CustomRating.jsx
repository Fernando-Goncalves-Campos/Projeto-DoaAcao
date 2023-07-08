import { memo } from "react";

import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { orange, yellow, lightGreen } from '@mui/material/colors';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error"/>,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon sx={{color:orange[500]}}/>,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon sx={{color:yellow[500]}}/>,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon sx={{color:lightGreen["A700"]}}/>,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success"/>,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function CustomRating({onChange = (value) => {console.log(value)}, defaultValue = 0, readOnly = false}) {
	return(
        <StyledRating
            name="highlight-selected-only"
            onChange={(event, value) => {onChange(value)}}
            defaultValue={defaultValue}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            readOnly={readOnly}
            highlightSelectedOnly
        />
    );
}

export default memo(CustomRating);