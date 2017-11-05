import React from 'react';

import EventItem from './EventItem';

const events = [
    {
        title: 'Slavnostní otevření restaurace Marjánka',
        place: 'Rastaurace Marjánka',
        rating: 4,
        numberOfRatings: 72,
        time: '12:00 - 15:00',
        date: '25. října',
        dateText: 'Právě v plném proudu',
        participants: 5,
        private: false,
        image: 'thumbnail1.jpg'
    },{
        title: 'Pivko a pokec o výsledku voleb',
        place: 'Nasraný Šálek',
        rating: 3,
        numberOfRatings: 56,
        time: '20:00',
        date: '28. října',
        dateText: 'Začne za necelé 3 hodiny',
        participants: 8,
        private: true,
        image: 'thumbnail3.jpg'
    },{
        title: 'Speeddating pro všechny svobodné',
        place: 'Cukr káva limonáda',
        rating: 4.25,
        numberOfRatings: 23,
        time: '21:00',
        date: '1. listopad',
        dateText: 'Začne za necelé 4 hodiny',
        participants: 20,
        private: false,
        image: 'thumbnail2.jpg'
    }
];

const RecomendedEvents = () => {
    const eventsList = events.map((event, index) => (
        <EventItem key={index.toString()} eventInfo={event} />
    ));

    return (
        <div className="d-flex flex-wrap justify-content-between">
            {eventsList}
        </div>
    );
};

export default RecomendedEvents;
