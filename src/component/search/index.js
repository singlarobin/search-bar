import React from 'react';
import classes from './styles.module.css';

const Search = props => {
    const { searchInput, handleInputChange } = props;

    const handleChange = e => handleInputChange(e.target.value);

    return <input className={classes.inputText} type='text' placeholder='Search'
        onChange={handleChange} value={searchInput} />;
};

export default Search;