import React from 'react';
import propTypes from 'prop-types';

import SearchResultItem from './SearchResultItem';

const SearchResults = (props) => {
    const { searchData } = props;
    const results = searchData.map(searchItem =>
        <SearchResultItem key={searchItem.id} data={searchItem} />
    );

    return (
        <div className="SearchResults">
            {results}
        </div>
    );
};

SearchResults.propTypes = {
    searchData: propTypes.shape({
        id: propTypes.number
    }).isRequired
};

export default SearchResults;