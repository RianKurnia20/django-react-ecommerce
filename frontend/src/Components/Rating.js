import React from 'react'

function Rating({ value, text, color }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        let starClass = 'fas fa-star';

        if (value >= i) {
            starClass = 'fas fa-star';
        } else if (value >= i - 0.5) {
            starClass = 'fas fa-star-half-alt';
        } else {
            starClass = 'far fa-star';
        }

        stars.push(
            <span key={i}>
                <i style={{ color }} className={starClass}></i>
            </span>
        );
    }

    return (
        <div className='rating'>
            {stars}
            <span>{text && text}</span>
        </div>
    );
}

export default Rating
