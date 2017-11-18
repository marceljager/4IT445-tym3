import React from 'react';
import { Link } from 'react-router-dom';

const SearchResultItem = props => (
    <Link to={`/uzivatel/${props.data.id}`}>{props.data.name}</Link>
);

export default SearchResultItem;
