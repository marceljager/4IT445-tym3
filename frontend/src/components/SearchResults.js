import React from 'react';

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

export default SearchResults;