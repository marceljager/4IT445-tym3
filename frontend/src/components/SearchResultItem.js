import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchResultItem = props => (
    <Link to={`/uzivatel/${props.data.id}`}>{props.data.name}</Link>
);

SearchResultItem.propTypes = {
    data: propTypes.shape({
        id: propTypes.number,
        name: propTypes.name
    }).isRequired
};

export default SearchResultItem;
