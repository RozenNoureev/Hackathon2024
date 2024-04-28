// HERE WE WANT TO ALLOW FOR INFORMATION FROM MARKERS TO POP UP 
// WE TAKE INPUT IN THE FORM OF A DIV HOLDING THE INFORMATION NEEDED TO BE DISPLAYED 

import { Marker } from "react-simple-maps";

function MarkerPopupComponent ({id, cordinates, details}) {
    return (
        <div className="tooltip" data-tip={details}>
            {/** HERE WE WANT TO PLACE OUR MARKER */}
            <Marker key={id} cordinates={cordinates}>
                <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
            </Marker>
            {id}
        </div>
    );
}

export default MarkerPopupComponent