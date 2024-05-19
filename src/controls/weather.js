import proj4 from 'proj4';
import { Component, Modal } from '../ui';

const Weather = function Weather(options = {}) {
  let {
    target
  } = options;
  const {
    icon = '#ic_white-balance-sunny_24px',
    title = 'Visa väder'
  } = options;

  let viewer;
  let mapMenu;
  let menuItem;
  let getCelsiusDegree;
  let getSymbolToRender;
  let modal;
  let el;

  const getweather = async () => {
    const view = viewer.getMap().getView();
    const getCenterXCoord = view.getCenter().map(coord => Math.round(coord))[0];
    const getCenterYCoord = view.getCenter().map(coord => Math.round(coord))[1];
    const centerCoords = proj4('EPSG:3857', 'EPSG:4326', [getCenterXCoord, getCenterYCoord]);
    const response = await fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${centerCoords[0].toFixed(3)}/lat/${centerCoords[1].toFixed(3)}/data.json`);
    const tenDaysForecast = await response.json();
    return tenDaysForecast.timeSeries[2].parameters;
  };

  return Component({
    name: 'weather',
    onAdd(evt) {
      viewer = evt.target;
      target = viewer.getId();
      mapMenu = viewer.getControlByName('mapmenu');
      menuItem = mapMenu.MenuItem({
        async click() {
          const params = await getweather();
          getCelsiusDegree = params.filter((item) => item.name === 't')[0].values[0];
          getSymbolToRender = params.filter((item) => item.name === 'Wsymb2')[0].values[0];
          modal = Modal({
            content: `<img src="https://www.smhi.se/polopoly_fs/1.12110.1518507377!/image/1.png_gen/derivatives/Original_259px/image/${getSymbolToRender}.png" alt="" />
            <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-weight: bold;">
            ${getCelsiusDegree}&deg;C
            </div>`,
            target,
            style: 'background-color: transparent; box-shadow: none;'
          });
          document.getElementById(modal.getComponents()[1].getId()).classList.add('hidden');
          this.addComponent(modal, el);
          mapMenu.close();
        },
        icon,
        title,
        ariaLabel: title
      });
      this.addComponent(menuItem);
      this.render();
    },
    render() {
      mapMenu.appendMenuItem(menuItem);
      this.dispatch('render');
    }
  });
};

export default Weather;
