import React from 'react';
import { Link } from 'react-router-dom';

const SearchResultItem = props => (
    <Link to={`/uzivatel/${props.data.id}`}>{props.data.firstName} {props.data.lastName}</Link>
);

export default SearchResultItem;
