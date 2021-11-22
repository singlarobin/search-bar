import React from 'react';
import classes from './styles.module.css';
import SearchIcon from '../../assets/searchIcon';

const Search = props => {
    const { searchInput, handleInputChange } = props;

    const handleChange = e => handleInputChange(e.target.value);

    const handleButtonClick = () => alert('Button functionality not Implemented!!');

    return <div className={classes.container}>
        <input className={classes.inputText} type='text' placeholder='Search'
            onChange={handleChange} value={searchInput} />
        <SearchIcon style={{paddingRight: '0.5rem', cursor:'pointer'}} onClick={handleButtonClick}/>
    </div>;
};

export default Search;