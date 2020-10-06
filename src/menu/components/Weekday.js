import React from 'react';

function Weekday (props) {
    let weekday = props.weekday;
    while (weekday > 7) {
        weekday = weekday-7;
    }
     switch(weekday) {
        case 1: weekday = "Måndag"; break;
        case 2: weekday = "Tisdag"; break;
        case 3: weekday = "Onsdag"; break;
        case 4: weekday = "Torsdag"; break;
        case 5: weekday = "Fredag"; break;
        case 6: weekday = "Lördag"; break;
        case 7: weekday = "Söndag"; break;
        default: weekday = ""; 
    }

    return (
        <div className="weekday">
            {weekday}
        </div>
    )
}

export default Weekday;