import React from 'react';

import feelsBadMan from '../img/emojis/feelsbadman.png';
import bam from '../img/emojis/bam.gif';
import dog from '../img/emojis/dog.gif';
import pogchamp from '../img/emojis/pogchamp.png';
import poop from '../img/emojis/poop.png';
import parrot from '../img/emojis/parrot.gif';
import potato from '../img/emojis/potato.png';

export default ({ comment }) => {
    const text = comment.text.split(':').map((t, index) => {
        switch (t) {
        case 'feelsbadman':
            return (<img src={feelsBadMan} alt=":FeelsBadMan:" width={16} height={16} key={index} />);
        case 'bam':
            return (<img src={bam} alt=":bam:" width={16} height={16} key={index} />);
        case 'dog':
            return (<img src={dog} alt=":dog:" width={16} height={16} key={index} />);
        case 'pogchamp':
            return (<img src={pogchamp} alt=":pogchamp:" width={16} height={16} key={index} />);
        case 'roman':
            return (<img src={parrot} alt=":roman:" width={16} height={16} key={index} />);
        case 'filip':
            return (<img src={potato} alt=":filip:" width={16} height={16} key={index} />);
        case 'poop':
            return (<img src={poop} alt=":poop:" width={16} height={16} key={index} />);
        default:
            return <span className="mr-1" key={index}>{t}</span>;
        }
    });

    return text;
}