import React, { Component } from 'react';

class EventDetail extends Component {
    render() {
        const mainImage = {
            backgroundImage: 'url(./upload/eventImages/thumbnail1.jpg)'
        };

        return (
            <div className="EventDetail container">
                <div className="ParticipationBar">
                    <span className="ParticipationBar-text">Přijdeš na akci?</span>
                    <div className="ParticipationBar-buttonsContainer">
                        <button className="Button">Ano, přijdu</button>
                        <button className="Button Button-deny">Ne, nepřijdu</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-5 position-static">
                        <div className="EventDetail-mainImageContainer" style={mainImage}>
                            <img src="" alt="" className="EventDetail-mainImage" />
                        </div>
                    </div>
                    <div className="col-7 EventDetail-textSide p-5">
                        <h2 className="EventDetail-title mb-4">Slavnostní otevření restaurace Marjánka</h2>
                        <div className="EventDetail-date"><strong>Sobota</strong> 14. listopadu</div>
                        <div className="EventDetail-time">v 17 hodin</div>

                        <h5 className="mt-5">O čem akce bude</h5>
                        <div className="EventDetail-about">
                            Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu.
                            Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý
                            tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel
                            pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny.
                        </div>

                        <div className="row mt-5">
                            <div className="col-6">
                                <h5>Jak se tam dostanu?</h5>
                                <div className="RestaurantInfo">
                                    <div className="RestaurantInfo-name">Restaurace Marjánka</div>
                                    <div className="RestaurantInfo-address">Plážová 33, Praha 5</div>
                                    <div className="RestaurantInfo-note">Rezervace na jméno Jaroš</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <h5>Kdo přijde?</h5>
                                <div className="RestaurantInfo">
                                    <div className="RestaurantInfo-avatarsContainer">
                                        <div className="RestaurantInfo-avatar">
                                            <img src="https://graph.facebook.com/100001023439070/picture" alt="Marcel Jäger" />
                                        </div>
                                        <div className="RestaurantInfo-avatar">
                                            <img src="https://graph.facebook.com/1702981537/picture" alt="Roman Fausek" />
                                        </div>
                                        <div className="RestaurantInfo-avatar">
                                            <img src="https://graph.facebook.com/1422340757/picture" alt="Miroslav Horňák" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventDetail;
