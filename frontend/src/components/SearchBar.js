import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SearchIcon from '../img/icons/search.svg';

import { API_URL } from '../constants';

const makeBold = (str, find) => {
    const re = new RegExp(find, 'g');
    return str.replace(re, `<b>${find}</b>`);
}

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
        if (e.target.value.length > 0) {
            this.loadData(this.state.searchValue);
        }
    };

    loadData(searchText) {
        axios.post(`${API_URL}/search.php`, {
            searchText
        })
            .then((response) => {
                this.setState({
                    searchData: response.data,
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
        console.log(this.state.searchData);
        let items = [];

        if (this.state.searchData.length > 0) {
            items = this.state.searchData.map(item => (
                <Link to={`/uzivatel/${item.id}`} className="SearchBar-whispererItem">
                    <div className="Avatar">
                        <img src={`https://graph.facebook.com/${item.photo}/picture`} alt={item.name}/>
                    </div>
                    <span className="SearchBar-whispererItemName">{item.name}</span>
                </Link>
            ));
        }

        return (
            <div className="SearchBar">
                <div className="SearchBar-inputContainer">
                    <input type="text" value={this.state.searchValue} onChange={this.handleSearchValueChange} onKeyUp={this.handleKeyDown} onFocus={this.toggleSearch} onBlur={this.toggleSearch} className="SearchBar-input" placeholder="Hledat" />
                    <Link to={`/hledat/${this.state.searchValue}`} className="SearchBar-button" >
                        <ReactSVG path={SearchIcon} className="SearchBar-icon" />
                    </Link>
                </div>

                <div className={`SearchBar-whisperer${this.state.searchValue.length > 0 && this.state.searchVisible ? ' isVisible' : ''}`}>
                    {items}
                </div>
            </div>
        );
    }
}

export default SearchBar;
