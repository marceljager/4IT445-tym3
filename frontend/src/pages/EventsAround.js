import React from 'react';

import TodayEvents from '../components/TodayEvents';

const EventsAround = () => (
    <div className="container mb-5">
        <div className="row mt-5">
            <div className="col-8">
                <div className="row">
                    <h4 className="my-4"><strong>Dnes</strong> na programu</h4>
                    <TodayEvents />
                </div>
                <div className="row">
                    <h4 className="my-4"><strong>Zítřejší</strong> akce</h4>
                    <TodayEvents />
                </div>
            </div>
            <div className="col-4">
                <h6 className="mt-4">Vyhledat</h6>
                <div className="Input">
                    <input type="text" className="Input-input" title="Vyhledat" placeholder="Najít restauraci nebo akci" />
                </div>
            </div>
        </div>
    </div>
);

export default EventsAround;
