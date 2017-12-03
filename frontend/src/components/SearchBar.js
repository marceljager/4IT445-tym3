import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SearchIcon from '../img/icons/search.svg';

import { API_URL } from '../constants';
import Avatar from './Avatar';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            searchData: [],
            searchVisible: false
        };
    }

    handleSearchValueChange = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    };

    handleKeyDown = (e) => {
        if (e.target.value.length > 2) {
            this.loadData(this.state.searchValue);
        }
    };

    loadData(searchText) {
        axios.get(`${API_URL}/events/search?q=${searchText}`)
            .then((response) => {
                this.setState({
                    searchData: response.data.data,
                    searchVisible: true
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    }

    toggleSearch = () => {
        this.setState(prevState => ({
            searchVisible: !prevState.searchVisible
        }));
    };

    render() {
        let items = [];

        if (this.state.searchData.length > 0) {
            items = this.state.searchData.map((item, index) => {
                let url = 'detail-akce';
                if (item.resultType === 'User') {
                    url = 'uzivatel';
                }
                return (
                    <Link to={`/${url}/${item.id}`} key={index.toString()} className="SearchBar-whispererItem">
                        <Avatar user={item} />
                        <span className="SearchBar-whispererItemName">{item.name}</span>
                    </Link>
                );
            });
        }

        return (
            <div className="SearchBar">
                <div className="SearchBar-inputContainer">
                    <input
                        type="text"
                        value={this.state.searchValue}
                        onChange={this.handleSearchValueChange}
                        onKeyUp={this.handleKeyDown}
                        onFocus={this.toggleSearch}
                        className="SearchBar-input"
                        placeholder="Hledat"
                    />
                    <Link to={`/hledat/${this.state.searchValue}`} className="SearchBar-button" >
                        <ReactSVG path={SearchIcon} className="SearchBar-icon" />
                    </Link>
                </div>
                {this.state.searchData.length > 0 &&
                    <div
                        className={`SearchBar-whisperer${this.state.searchValue.length > 0 && this.state.searchVisible ? ' isVisible' : ''}`}
                    >
                        {items}
                    </div>
                }
            </div>
        );
    }
}

export default SearchBar;
