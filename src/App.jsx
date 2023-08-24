import { useEffect, useState, useRef } from "react";
import {
  setDefaultCredentials,
  CartoLayer,
  MAP_TYPES,
  colorBins,
  fetchMap,
  API_VERSIONS,
} from "@deck.gl/carto";
import { GeoJsonLayer } from "@deck.gl/layers";
import { Tile3DLayer } from "@deck.gl/geo-layers";
import {
  DataFilterExtension,
  _TerrainExtension as TerrainExtension,
} from "@deck.gl/extensions";
import { Deck } from "@deck.gl/core";
import DeckGL from "@deck.gl/react";
import { CesiumIonLoader } from "@loaders.gl/3d-tiles";
import { Easing } from "@tweenjs/tween.js";

export default function App() {
  const cartoMapId = "9deb025f-45ea-4bb0-a2dc-74a97d2f1ce8";
  const zoomTimeoutRef = useRef(null);
  const [zoomedOut, setZoomedOut] = useState(false);

  // Zoom-out
  const handleZoom = () => {
    setZoomedOut(true);
    const zoomOutDuration = 40000;
    zoomTimeoutRef.current = setTimeout(() => {
      setViewState((vs) => ({
        ...vs,
        zoom: vs.zoom - 1,
        transitionDuration: zoomOutDuration,
        transitionEasing: Easing.Quadratic.InOut,
        onTransitionEnd: () => setViewState({ ...vs }),
      }));
    }, 2000);
  };

  const handlePause = () => {
    setZoomedOut(false);

    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
      zoomTimeoutRef.current = null;
    }

    setViewState((vs) => ({ ...vs, transitionDuration: 0 }));
  };

  const [viewState, setViewState] = useState({
    longitude: -73.979,
    latitude: 40.7639,
    zoom: 15,
    pitch: 60,
    bearing: 28,
  });

  const tile3DLayer = new Tile3DLayer({
    data: "https://tile.googleapis.com/v1/3dtiles/root.json",
    loadOptions: {
      fetch: {
        headers: { "X-GOOG-API-KEY": import.meta.env.VITE_GOOGLE_API_KEY },
      },
    },
    operation: "terrain+draw",
  });

  const FADE_IN_COLOR = {
    getFillColor: {
      duration: 1000,
      easing: Easing.Cubic.In,
      enter: (value) => {
        return [value[0], value[1], value[2], 0];
      },
    },
  };

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ];
  }

  function lerp(a, b, p) {
    return a + (b - a) * p;
  }

  const cartoLayer = new CartoLayer({
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: `
      SELECT
        b.*,
        ST_DISTANCE(b.geom, c.geom) AS distance
      FROM
        carto-demo-data.demo_tables.manhattan_pluto_data b,
        carto-dw-ac-zp3r15zi.shared.CompostNYC c
      WHERE
        ST_DWithin(b.geom, c.geom, 80*3+1)
        AND b.landuse <> '09';`,
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: colorBins({
      attr: "distance",
      domain: [
        lerp(80, 80 * 3, 0 / 2),
        lerp(80, 80 * 3, 1 / 2),
        lerp(80, 80 * 3, 2 / 2),
      ],
      colors: ["#fbb4b9", "#f768a1", "#7a0177"].map(hexToRgb),
    }),
    opacity: 0.2,
    transitions: FADE_IN_COLOR,
    lineWidthMinPixels: 1,
    extensions: [new TerrainExtension()],
  });

  const layers = [tile3DLayer, cartoLayer];

  // Connect to CARTO API
  setDefaultCredentials({
    apiBaseUrl: "https://gcp-us-east1.api.carto.com",
    accessToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfenAzcjE1emkiLCJqdGkiOiJlODVkYWIzNiJ9.MiFHlhzZcIGqfiWNIU9440II6-p2fgKe6PJOKlX64x4",
  });

  return (
    <>
      <DeckGL
        id="map"
        initialViewState={viewState}
        controller={true}
        layers={layers}
      />
      <div id="legend">
        <div>
          <div
            className="distance heading"
            style={{
              fontSize: "0.90rem",
              fontWeight: "bold",
              paddingBottom: "20px",
              color: "white",
            }}
          >
            Distance from Compost
          </div>
        </div>
        <div className="legend-item">
          <div
            className="color-circle"
            style={{
              backgroundColor: "#fbb4b9",
            }}
          ></div>
          <span className="distance">1 block</span>
        </div>
        <div className="legend-item">
          <div
            className="color-circle"
            style={{ backgroundColor: "#f768a1" }}
          ></div>
          <span className="distance">3 blocks</span>
        </div>
        <div className="legend-item">
          <div
            className="color-circle"
            style={{ backgroundColor: "#7a0177" }}
          ></div>
          <span className="distance">5 blocks</span>
        </div>
        <div className="legend-item">
          <div
            className="color-circle"
            style={{ backgroundColor: "grey" }}
          ></div>
          <span className="distance"> &gt; 6 blocks</span>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "grey",
            paddingTop: "8px",
            paddingBottom: "14px",
          }}
        >
          <em>*Blocks are street length; ~264ft.</em>
        </div>
        <div>
          <button
            style={{
              padding: "7px",
              margin: "8px",
              border: "0.5px solid white",
            }}
            onClick={zoomedOut ? handlePause : handleZoom}
          >
            {zoomedOut ? "Pause" : "Zoom out"}
          </button>
        </div>
      </div>
    </>
  );
}
