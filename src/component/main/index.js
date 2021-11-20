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


    const handleSearchInput = value => {
        setSearchInput(value);
        debounce(actualApiCall)();
    }

    // const callAPI = () => console.log(searchInput);

    const actualApiCall = async () => {
        const params = '&size=6&suggestions=1&maxSuggestions=6';
        const url = URL + searchInput + params;
        let response = await fetch(url);

        if (!response.ok) {
            console.log('error');
        }
        else {
            let json = await response.json();
            console.log('json:', json);
            setTopSuggestions(json.suggestions);
            setTopCollections(json.sfacets.collectionname);
            setResults(json.results);
            setProduct(json.suggestions !== 0 ? json.suggestions[0].suggestion : '');
        }
    };

    const debounce = (callbackFxn, delay = 2000) => {
        // let timer;
        return function () {
            console.log('timer:', timer);
            clearTimeout(timer);
            const context = this;
            const args = arguments;

            let t = setTimeout(() => {
                callbackFxn.apply(context, [args]);
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
            console.log('error');
        }
        else {
            let json = await response.json();
            console.log('json:', json);
            setResults(json.results);
        }
    }

    return <div className={classes.container} >
        <Search inputValue={searchInput} handleInputChange={handleSearchInput} />
        {results.length !== 0 ? <DropDown suggestions={topSuggestions} collections={topCollections}
            results={results} product={product} handleProductChange={handleProductChange} />
            : null}
    </div>;
};

export default Main;