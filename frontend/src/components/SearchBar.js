import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';

import SearchIcon from '../img/icons/search.svg';

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
                <input type="text" value={this.state.searchValue} onChange={this.handleSearchValueChange} className="SearchBar-input" placeholder="Hledat" />
                <Link to={`/hledat/${this.state.searchValue}`} className="SearchBar-button" >
                    <ReactSVG path={SearchIcon} callback={svg => console.log(svg)} className="SearchBar-icon" />
                </Link>
            </div>
        );
    }
}

export default SearchBar;
