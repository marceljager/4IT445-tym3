import React, { Component } from 'react';
import axios from 'axios';

import EventItem from './EventItem';

import { API_URL } from '../constants';

class RecomendedEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        axios.get(`${API_URL}/events/publicFeed?filter[limit]=3`)
            .then((response) => {
                this.setState({
                    events: response.data.data
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    }

    render() {
        console.log(this.state.events);
        let eventsList = [];
        if (this.state.events.length > 0) {
            eventsList = this.state.events.slice(0, 3).map((event, index) => (
                <EventItem key={index.toString()} itemType="compact" eventInfo={event} />
            ));
        }

        return (
            <div className="Home-recommended">
                <h4 className="mb-4"><strong>Doporučené</strong> akce</h4>
                <div className="d-flex justify-content-between">
                    {this.state.events.length > 0 &&
                        eventsList
                    }
                </div>
            </div>
        );
    }
}

export default RecomendedEvents;
