import React from 'react';

import './EventItem.css';

const eventItem = props => (
    <li key={props.eventId} className='events__list-item'>
        <div>
            <h1>{props.title}</h1>
            <h2>${props.price} - {new Date(props.date).toLocaleDateString('de-DE')}</h2>
        </div>
        <div>
            {props.userId === props.creatorId ? (
                <p>Dono desse evento.</p> 
            ) : ( 
                <button className="btn" onClick={props.onDetail.bind(this, props.eventId)}>
                    Detalhes
                </button>
            )}
        </div>
    </li>
);

export default eventItem;