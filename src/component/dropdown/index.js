import classes from './styles.module.css';
import Product from '../product';
import { isEmptyString, isEmptyObject } from '../../utils';
import { Fragment, useRef, useCallback, useEffect } from 'react';

const DropDown = props => {
    const { suggestions, collections, results, product, handleProductChange, handleOpen, errorMessage } = props;
    const node = useRef(null);

    const handleMouseOver = e => handleProductChange(e.target.innerText);
    const handleButtonClick = () => alert('Button functionality not Implemented!!');

    const handleClick = useCallback(e => {
        if (node?.current?.contains(e.target)) {
            // inside click
            return;
        }
        handleOpen();
    }, [handleOpen]);

    useEffect(() => {
        window.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    }, [handleClick]);

    return <div ref={node} className={classes.wrapper}>
        {isEmptyString(errorMessage) ? <div  className={classes.container}>
            <div className={classes.leftContainer}>
                {!isEmptyObject(suggestions) && suggestions.length !== 0 ? <Fragment>
                    <div className={classes.listHeading}>TOP SEARCHES</div>
                    {suggestions.map((item, index) =>
                        <div className={classes.listItem} key={index} onMouseOver={handleMouseOver}>
                            {item.suggestion}
                        </div>
                    )}
                </Fragment> : null}
                {!isEmptyObject(collections) && collections.length !== 0 ? <Fragment>
                    <div className={classes.listHeading}>TOP COLLECTIONS</div>
                    {collections.map((item, index) =>
                        <div className={classes.listItem} key={index} onMouseOver={handleMouseOver}>
                            {item.name}
                        </div>
                    )}
                </Fragment> : null}
            </div>
            <div className={classes.rightContainer}>
                {!isEmptyObject(results) && results.length !== 0 ? <Fragment>
                    <div className={classes.productHeading}>POPULAR PRODUCTS IN ' {product} ' </div>
                    <div className={classes.productList}>
                        {results.map((item, index) =>
                            <Product key={index} name={!isEmptyString(item.collectionname) ? item.collectionname : item.productname}
                                mrpPrice={item.mrpprice} withoutDiscountPrice={item.pricewithoutdiscount} imgUrl={item.productimage} />
                        )}

                    </div>
                </Fragment> : null}
                <button className={classes.button} onClick={handleButtonClick}>View All Search Results</button>
            </div>
        </div> : <div className={classes.errorContainer}>{errorMessage}</div>}
    </div>
};

export default DropDown;