import React from 'react';
import classes from './styles.module.css';

const Product = props => {
    const { imgUrl, name, mrpPrice, withoutDiscountPrice } = props;
    return <div className={classes.container}>
        <img className={classes.image} src={imgUrl} alt='Not Found' />
        <div className={classes.name}>{name}</div>
        <div className={classes.price}>
            <div>
                {withoutDiscountPrice}
            </div>
            <div className={classes.mrpPrice}>
                {mrpPrice}
            </div>
        </div>
    </div>
}

export default Product;