import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import SearchResults from '../components/SearchResults';

import { API_URL } from '../constants';

class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchData: []
        };
    }

    componentDidMount() {
        const { searchText } = this.props.match.params;

        if (searchText) {
            this.loadData(searchText);
        }
    }

    componentWillReceiveProps(props) {
        if (props.match && props.match.params.searchText) {
            this.loadData(props.match.params.searchText);
        }
    }

    loadData(searchText) {
        axios.post(`${API_URL}/search.php`, {
            searchText
        })
            .then((response) => {
                this.setState({
                    searchData: response.data
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    }

    render() {
        return (
            <div className="SearchPage">
                <h1>Search</h1>
                {this.state.searchData.length > 0
                    ? <SearchResults searchData={this.state.searchData} />
                    : <div>Loading</div>
                }
            </div>
        );
    }
}

SearchPage.propTypes = {
    match: propTypes.shape({
        params: propTypes.shape({
            searchText: propTypes.string
        })
    }),
};

SearchPage.defaultProps = {
    match: {
        params: {
            searchText: ''
        }
    }
};

export default SearchPage;
