import React from 'react';

const ItemListContainer = ({ greeting }) => {
    return (
        <>
            <h1 className="item-list-container">{greeting}</h1>
        </>
    );
};

export default ItemListContainer;
