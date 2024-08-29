const origo = Origo('index.json');
origo.on('load', (viewer) => {
  const globe = Globe({
    showGlobe: true,
    globeOnStart: false,
    deactivateControls: ['measure', 'search'],
    settings: {
      depthTestAgainstTerrain: true,
      enableAtmosphere: true,
      enableGroundAtmosphere: true,
      enableFog: true,
      enableLighting: true,
      shadows: {
        darkness: 0.3,
        fadingEnabled: true,
        maximumDistance: 5000,
        normalOffset: true,
        size: 2048,
        softShadows: false
      },
      skyBox: {
        url: 'http://localhost:9966/plugins/globe/cesiumassets/Assets/Textures/SkyBox/',
        images: {
          pX: 'tycho2t3_80_px.jpg',
          nX: 'tycho2t3_80_mx.jpg',
          pY: 'tycho2t3_80_py.jpg',
          nY: 'tycho2t3_80_my.jpg',
          pZ: 'tycho2t3_80_pz.jpg',
          nZ: 'tycho2t3_80_mz.jpg'
        }
      }
    },
    cesiumIontoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjNjMzFlNy1iNmFmLTRiYTMtOWIyYi0yZTY4ZDkxODc4MTQiLCJpZCI6NDAxMDgsImlhdCI6MTY1MTgyMzEyM30.jwZaHaF3d4LtXlSHhSkqPs43Erx1o2D1rIgJgSu6EX8',
    // "gltf": [
    //   {
    //     "url": "http://localhost:9966/data/origo_globe.gltf",
    //     "lat": 18.10697,
    //     "lng": 59.12514,
    //     "height": 100, // Needs heightReference to be set to NONE
    //     "heightReference": "CLAMP_TO_TERRAIN", //https://cesium.com/learn/ion-sdk/ref-doc/global.html?classFilter=heightReference#HeightReference
    //     "animation": {
    //       "name": "SphereAction"
    //     }
    //   }
    // ],
    cesiumTerrainProvider: '',
    cesiumIonassetIdTerrain: 1
  });
  viewer.addComponent(globe);
});
