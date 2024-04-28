import React from "react";
import {
    ComposableMap, Geographies, Geography,
    ZoomableGroup, Marker
} from "react-simple-maps";
import MarkerPopupComponent from "./MarkerPopupComponent";


const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const markers = [
    {
        markerOffset: -15,
        id: "Buenos Aires",
        coordinates: [-58.3816, -34.6037]
    },
    { markerOffset: -15, id: "La Paz", coordinates: [-68.1193, -16.4897] },
    { markerOffset: 25, id: "Brasilia", coordinates: [-47.8825, -15.7942] },
    { markerOffset: 25, id: "Santiago", coordinates: [-70.6693, -33.4489] },
    { markerOffset: 25, id: "Bogota", coordinates: [-74.0721, 4.711] },
    { markerOffset: 25, id: "Quito", coordinates: [-78.4678, -0.1807] },
    { markerOffset: -15, id: "Georgetown", coordinates: [-58.1551, 6.8013] },
    { markerOffset: -15, id: "Asuncion", coordinates: [-57.5759, -25.2637] },
    { markerOffset: 25, id: "Paramaribo", coordinates: [-55.2038, 5.852] },
    { markerOffset: 25, id: "Montevideo", coordinates: [-56.1645, -34.9011] },
    { markerOffset: -15, id: "Caracas", coordinates: [-66.9036, 10.4806] },
    { markerOffset: -15, id: "Lima", coordinates: [-77.0428, -12.0464] }
];

function TwoDimensionalMapVisualization() {
    // User{ id, password, email}
    // Logs{LID, UID, start_time, end_time, longitude, latitude, ip}
    // UID foreign key -> user.id
    return (
        <ComposableMap
            projection={"geoMercator"}
            scale={50}
        >
            {/* <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies> */}
            <ZoomableGroup center={[0, 0]} zoom={0.9}>

                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#EAEAEC"
                                stroke="#D6D6DA"
                            />
                        ))
                    }
                </Geographies>

                {markers.map(({ id, coordinates, markerOffset }) => (

                    // <MarkerPopupComponent 
                    // id={id} 
                    // cordinates={coordinates}
                    // details={"User id: xxxxxxxxxxxxx\nLogged on:yyy-yyy-yyy\nLogged off: currently active\nUser IP: rrr-rrrr-rrr"}
                    // />

                    <Marker key={id} coordinates={coordinates}>
                        {/** USE ON CLICK PROPERTY TO SHOW CASE DETAILS  */}
                        <circle  r={3} fill="#F00" stroke="#fff" strokeWidth={2} />
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize:5 }}
                        >
                            {id}
                        </text>

                    </Marker>
                ))}

            </ZoomableGroup>

        </ComposableMap>
    )
}

export default TwoDimensionalMapVisualization