import React, { useState } from 'react';
import Search from '../search';
import classes from './style.module.css';
import { URL } from '../../utils/constant';
import DropDown from '../dropdown';
import { isEmptyString } from '../../utils';

const Main = () => {
    const [searchInput, setSearchInput] = useState('');
    const [timer, setTimer] = useState();
    const [topSuggestions, setTopSuggestions] = useState([]);
    const [topCollections, setTopCollections] = useState([]);
    const [results, setResults] = useState([]);
    const [product, setProduct] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSearchInput = value => {
        setSearchInput(value);
        debounce(actualApiCall)(value);
    }

    const actualApiCall = async (searchValue) => {
        const params = '&size=6&suggestions=1&maxSuggestions=6';
        const url = URL + searchValue + params;
        let response = await fetch(url);

        if (!response.ok) {
            setErrorMessage('Not Found!');
        }
        else {
            let json = await response.json();
            console.log('json:', json);
            setTopSuggestions(json.suggestions);
            setTopCollections(json.sfacets.collectionname);
            setResults(json.results);
            setProduct(json.suggestions !== 0 ? json.suggestions[0].suggestion : '');
            setErrorMessage('');
        }
    };

    const debounce = (callbackFxn, delay = 2000) => {
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
        console.log('product:', value);
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
            console.log('json:', json);
            setResults(json.results);
            setErrorMessage('');
        }
    }

    return <div className={classes.container} >
        <Search inputValue={searchInput} handleInputChange={handleSearchInput} />
        {isEmptyString(errorMessage) ?
            results.length !== 0 ? <DropDown suggestions={topSuggestions} collections={topCollections}
                results={results} product={product} handleProductChange={handleProductChange} />
                : null
            : <div className={classes.errorContainer}>{errorMessage}</div>}

    </div>;
};

export default Main;