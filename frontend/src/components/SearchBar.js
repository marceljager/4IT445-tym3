import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        };
    }

    handleSearchValueChange = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    };

    render() {
        return (
            <div className="SearchBar">
                <input type="text" value={this.state.searchValue} onChange={this.handleSearchValueChange} />
                <Link to={`/hledat/${this.state.searchValue}`} className="SearchBar-button" >Hledat</Link>
            </div>
        );
    }
}

export default SearchBar;
