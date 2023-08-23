import { useEffect, useState } from "react";
import {
  setDefaultCredentials,
  CartoLayer,
  MAP_TYPES,
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
// import * as Cesium from "cesium";
import { CesiumIonLoader } from "@loaders.gl/3d-tiles";

export default function App() {
  const cartoMapId = "9deb025f-45ea-4bb0-a2dc-74a97d2f1ce8";
  const [viewState, setViewState] = useState({
    longitude: -73.9769,
    latitude: 40.7669,
    zoom: 15,
    pitch: 60,
    bearing: 0,
  });

  const tile3DLayer = new Tile3DLayer({
    data: "https://tile.googleapis.com/v1/3dtiles/root.json",
    loadOptions: {
      fetch: {
        headers: { "X-GOOG-API-KEY": import.meta.env.VITE_GOOGLE_API_KEY },
      },
    },
    operation: "terrain+draw",
    extensions: [new TerrainExtension()],
  });

  // const geoExtenderLayer = new deck.GeoJsonLayer({
  //   data: https://,
  //   getFillColor: [254, 246, 181]

  // })
  // const tile3DLayer = new Tile3DLayer({
  //   data: "https://tile.googleapis.com/v1/3dtiles/root.json?key=${apiKey}",
  //   loader: CesiumIonLoader,
  //   loadOptions: {
  //     fetch: {
  //       headers: { "X-GOOG-API-KEY": import.meta.env.VITE_GOOGLE_API_KEY },
  //     },
  //     "cesium-ion": {
  //       accessToken:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMmQ5MjM0Ni1hOGU1LTQ5NzEtODc5My0wYWNiNzI2NGZhZmIiLCJpZCI6MTYxNzM1LCJpYXQiOjE2OTI2NTAxNTJ9.Hhq-lnvsRVvAHB26aNzbfN_6KVrB0NvlRmyNj-wK8pY",
  //     },
  //   },
  //   operation: "terrain+draw",
  // });

  const cartoLayer = new CartoLayer({
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: "SELECT b.* FROM carto-demo-data.demo_tables.manhattan_pluto_data b,carto-dw-ac-zp3r15zi.shared.CompostNYC c WHERE ST_DWithin(b.geom, c.geom, 81);",
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [238, 77, 90],
    lineWidthMinPixels: 1,
    // extensions: [new TerrainExtension()],
  });

  const layers = [tile3DLayer];

  // Connect to CARTO API
  setDefaultCredentials({
    apiBaseUrl: "https://gcp-us-east1.api.carto.com",
    accessToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfenAzcjE1emkiLCJqdGkiOiJlODVkYWIzNiJ9.MiFHlhzZcIGqfiWNIU9440II6-p2fgKe6PJOKlX64x4",
  });

  // useEffect(() => {
  //   // CARTO layer
  //   fetchMap({ cartoMapId }).then((map) => {
  //     const deck = new Deck(map);

  //     // Add the CARTO layer to the deck
  //     //  deck.setProps({ layers: [cartoLayer] });
  //     // });
  //   });

  //   // Cesium
  //   const cesiumToken = import.meta.env.VITE_CESIUM_TOKEN;
  //   Cesium.Ion.defaultAccessToken = cesiumToken;

  //   const viewer = new Cesium.Viewer("cesiumContainer", {
  //     imageryProvider: false,
  //     baseLayerPicker: false,
  //     requestRenderMode: true,
  //   });

  //   // Google 3D Tiles
  //   const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  //   const tileset = viewer.scene.primitives.add(
  //     new Cesium.Cesium3DTileset({
  //       url: `https://tile.googleapis.com/v1/3dtiles/root.json?key=${apiKey}`,
  //       showCreditsOnScreen: true, // display attribution
  //     })
  //   );

  //   viewer.scene.globe.show = false;

  //   // Flyover
  //   const centralPark = Cesium.Cartesian3.fromDegrees(-73.9769, 40.7669, 900);
  //   const wallStreet = Cesium.Cartesian3.fromDegrees(-74.0134, 40.7056, 800);

  //   viewer.camera.flyTo({
  //     destination: centralPark,
  //     duration: 0.2,
  //     orientation: {
  //       heading: Cesium.Math.toRadians(31),
  //       pitch: Cesium.Math.toRadians(-30),
  //       roll: 0,
  //     },
  //   });

  //   return () => {
  //     viewer.destroy();
  //   };
  // }, []);

  return (
    <>
      {/* <div id="cesiumContainer" style={{ height: "80vh" }}></div> */}
      <DeckGL viewState={viewState} layers={layers} />;
    </>
  );
}
