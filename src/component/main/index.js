import React, { useState } from 'react';
import Search from '../search';
import classes from './style.module.css';
import { URL } from '../../utils/constant';
import DropDown from '../dropdown';

const Main = () => {
    const [searchInput, setSearchInput] = useState('');
    const [timer, setTimer] = useState();
    const [topSuggestions, setTopSuggestions] = useState([]);
    const [topCollections, setTopCollections] = useState([]);
    const [results, setResults] = useState([]);
    const [product, setProduct] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchInput = value => {
        setSearchInput(value);
        debounce(actualApiCall)(value);
    }

    const handleDropdownOpen = () => setIsOpen(false);

    const actualApiCall = async (searchValue) => {
        const params = '&size=6&suggestions=1&maxSuggestions=6';
        const url = URL + searchValue + params;
        let response = await fetch(url);

        if (!response.ok) {
            setErrorMessage('Not Found!');
        }
        else {
            let json = await response.json();
            setTopSuggestions(json.suggestions);
            setTopCollections(json.sfacets?.collectionname);
            setResults(json.results);
            setProduct(json.suggestions.length !== 0 ? json.suggestions[0].suggestion : '');
            setErrorMessage(json.results.length === 0 ? 'Not Found' : '');
            setIsOpen(true);
        }
    };

    const debounce = (callbackFxn, delay = 1000) => {
        return function (value) {
            clearTimeout(timer);
            const context = this;
            const args = arguments;
            let t = setTimeout(() => {
                callbackFxn.apply(context, [value, args]);
            }, delay);
            setTimer(t);
        }
    };

    const handleProductChange = async (value) => {
        setProduct(value);
        //call API for results
        const params = '&size=6&suggestions=1&maxSuggestions=6';
        const url = URL + value + params;
        let response = await fetch(url);

        if (!response.ok) {
            setErrorMessage('Not Found!');
        }
        else {
            let json = await response.json();
            setResults(json.results);
            setErrorMessage('');
            setIsOpen(true);
        }
    }

    return <div className={classes.container} >
        <Search inputValue={searchInput} handleInputChange={handleSearchInput} />
        {isOpen === true ? <DropDown suggestions={topSuggestions} collections={topCollections}
            results={results} product={product} handleProductChange={handleProductChange} handleOpen={handleDropdownOpen} errorMessage={errorMessage} />
            : null
        }
    </div>;
};

export default Main;