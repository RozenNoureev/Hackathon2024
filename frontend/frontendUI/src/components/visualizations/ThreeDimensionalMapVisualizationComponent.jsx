import React, { useState, useEffect } from "react";
import {
    ComposableMap, Geographies, Geography,
    ZoomableGroup, Marker
} from "react-simple-maps";
import * as THREE from 'three';

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

function ThreeDimensionalMapVisualizationComponent() {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1, rotation: [0, 0, 0] });

    const handleMoveEnd = (position) => {
        setPosition(position);
    };


    const rotationStyle = position.rotation ? { transform: `rotate(${position.rotation[0]}deg)` } : {};
    const createScene = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create a sphere
        const geometry = new THREE.SphereGeometry(10, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Add a light
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 0, 10);
        scene.add(light);

        // Position the camera
        camera.position.z = 15;

        // Render the scene
        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    };

    // Call the createScene function when the component mounts
    useEffect(() => {
        createScene();
    }, []);

    return (
        <div>
            <ComposableMap
                projection={"geoOrthographic"}
                projectionConfig={{ scale: 200 }}
            >
                {/* <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies> */}
                <ZoomableGroup
                    center={position.coordinates}
                    zoom={position.zoom}
                    onMoveEnd={handleMoveEnd}
                    style={{ pointerEvents: 'all', ...rotationStyle }}
                >

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
                            <circle r={3} fill="#F00" stroke="#fff" strokeWidth={2} />
                            <text
                                textAnchor="middle"
                                y={markerOffset}
                                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}

                            >
                                {id}
                            </text>

                        </Marker>
                    ))}

                </ZoomableGroup>

            </ComposableMap>
        </div>
    )
}

export default ThreeDimensionalMapVisualizationComponent