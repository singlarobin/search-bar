import classes from './styles.module.css';
import Product from '../product';
import { isEmptyString } from '../../utils';

const DropDown = props => {
    const { suggestions, collections, results, product, handleProductChange } = props;

    const handleMouseOver = e => handleProductChange(e.target.innerText);

    return <div className={classes.container}>
        <div className={classes.leftContainer}>
            <div>
                <div className={classes.listHeading}>TOP SEARCHES</div>
                {suggestions.length !== 0 ? suggestions.map((item, index) =>
                    <div className={classes.listItem} key={index} onMouseOver={handleMouseOver}>
                        {item.suggestion}
                    </div>
                ) : null}
            </div>
            <div>
                <div className={classes.listHeading}>TOP COLLECTIONS</div>
                {collections.length !== 0 ? collections.map((item, index) =>
                    <div className={classes.listItem} key={index} onMouseOver={handleMouseOver}>
                        {item.name}
                    </div>
                ) : null}
            </div>
        </div>
        <div className={classes.rightContainer}>
            <div className={classes.productHeading}>POPULAR PRODUCTS IN ' {product} ' </div>
            <div className={classes.productList}>
                {results.length !== 0 ? results.map((item, index) =>
                    <Product key={index} name={!isEmptyString(item.collectionname) ? item.collectionname : item.productname}
                        mrpPrice={item.mrpprice} withoutDiscountPrice={item.pricewithoutdiscount} imgUrl={item.productimage} />
                ) : null}

            </div>

        </div>
    </div>;
};

export default DropDown;