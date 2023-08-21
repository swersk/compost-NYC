import { useEffect } from 'react'
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export default function App() {

  useEffect(() => {
    console.log('test: ', apiKey)
    const viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: false,
      baseLayerPicker: false,
      requestRenderMode: true,
    });

    const tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: `https://tile.googleapis.com/v1/3dtiles/root.json?key=${apiKey}`,
      showCreditsOnScreen: true,
    }));

    viewer.scene.globe.show = false;


    return () => viewer.destroy();
  }, []);


  return (
    <div id="cesiumContainer"></div>
  )
}


