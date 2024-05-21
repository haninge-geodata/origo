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
  let imageUrl;

  const getWeather = async () => {
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
          const params = await getWeather();
          getCelsiusDegree = params.filter((item) => item.name === 't')[0].values[0];
          getSymbolToRender = params.filter((item) => item.name === 'Wsymb2')[0].values[0];
          switch (getSymbolToRender) {
            case 1:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12110.1518507377!/image/1.png_gen/derivatives/Original_259px/image/1.png';
              break;
            case 2:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.27958.1518507527!/image/2.png_gen/derivatives/Original_259px/image/2.png';
              break;
            case 3:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12111.1518507581!/image/3.png_gen/derivatives/Original_259px/image/3.png';
              break;
            case 4:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12112.1518507666!/image/4.png_gen/derivatives/Original_259px/image/4.png';
              break;
            case 5:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12113.1529310317!/image/5.png_gen/derivatives/Original_259px/image/5.png';
              break;
            case 6:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12114.1518507791!/image/6.png_gen/derivatives/Original_259px/image/6.png';
              break;
            case 7:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12115.1518507851!/image/7.png_gen/derivatives/Original_259px/image/7.png';
              break;
            case 8:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12116.1518507902!/image/8.png_gen/derivatives/Original_259px/image/8.png';
              break;
            case 9:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12117.1518507966!/image/9.png_gen/derivatives/Original_259px/image/9.png';
              break;
            case 10:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12118.1518508455!/image/10.png_gen/derivatives/Original_259px/image/10.png';
              break;
            case 11:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12119.1518508527!/image/11.png_gen/derivatives/Original_259px/image/11.png';
              break;
            case 12:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12120.1518508638!/image/12.png_gen/derivatives/Original_259px/image/12.png';
              break;
            case 13:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12121.1518508814!/image/13.png_gen/derivatives/Original_259px/image/13.png';
              break;
            case 14:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12122.1518508894!/image/14.png_gen/derivatives/Original_259px/image/14.png';
              break;
            case 15:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.12123.1518508957!/image/15.png_gen/derivatives/Original_259px/image/15.png';
              break;
            case 16:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130672.1518509119!/image/16.png_gen/derivatives/Original_259px/image/16.png';
              break;
            case 17:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130674.1518509610!/image/17.png_gen/derivatives/Original_259px/image/17.png';
              break;
            case 18:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130676.1518509779!/image/18.png_gen/derivatives/Original_259px/image/18.png';
              break;
            case 19:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130678.1518509832!/image/19.png_gen/derivatives/Original_259px/image/19.png';
              break;
            case 20:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130680.1518509884!/image/20.png_gen/derivatives/Original_259px/image/20.png';
              break;
            case 21:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130682.1518509953!/image/21.png_gen/derivatives/Original_259px/image/21.png';
              break;
            case 22:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130684.1518509991!/image/22.png_gen/derivatives/Original_259px/image/22.png';
              break;
            case 23:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130686.1518510040!/image/23.png_gen/derivatives/Original_259px/image/23.png';
              break;
            case 24:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130688.1518510101!/image/24.png_gen/derivatives/Original_259px/image/24.png';
              break;
            case 25:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130690.1518510154!/image/25.png_gen/derivatives/Original_259px/image/25.png';
              break;
            case 26:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130692.1518510202!/image/26.png_gen/derivatives/Original_259px/image/26.png';
              break;
            case 27:
              imageUrl = 'https://www.smhi.se/polopoly_fs/1.130694.1518510246!/image/27.png_gen/derivatives/Original_259px/image/27.png';
              break;
            default:
          }
          modal = Modal({
            content: `<img src="${imageUrl}" alt="No image found" />
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
