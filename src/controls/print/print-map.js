import olAttribution from 'ol/control/Attribution';
import olScaleLine from 'ol/control/ScaleLine';
import { dom, Component, Element as El } from '../../ui';
import Logo from './logo';
import NorthArrow from './north-arrow';

export default function PrintMap(options = {}) {
  const {
    logo,
    logoPlacement,
    northArrow,
    northArrowPlacement,
    scaleLinePlacement,
    attributionPlacement,
    map
  } = options;
  let {
    showNorthArrow
  } = options;

  let mapControls;
  let scaleLine;

  const mapControlContainers = {
    'top-left': El({ cls: 'flex column align-start absolute top-left transparent z-index-ontop-middle' }),
    'top-center': El({ cls: 'flex column align-start absolute top-center transparent z-index-ontop-middle' }),
    'top-right': El({ cls: 'flex column align-start absolute top-right transparent z-index-ontop-middle' }),
    'bottom-left': El({ cls: 'flex column align-start absolute bottom-left transparent z-index-ontop-middle' }),
    'bottom-center': El({ cls: 'flex column align-start absolute bottom-center transparent z-index-ontop-middle' }),
    'bottom-right': El({ cls: 'flex column align-start absolute bottom-right transparent z-index-ontop-middle' })
  };

  const logoComponent = Logo({ logo });
  const northArrowComponent = NorthArrow({ northArrow, map });

  return Component({
    onInit() {
      this.addComponents(Object.values(mapControlContainers));
      this.on('change:toggleNorthArrow', this.toggleNorthArrow.bind(this));
      this.on('change:toggleScale', this.toggleScale.bind(this));
      this.on('change:setDPI', this.setDpi.bind(this));
    },
    onRender() {
      this.dispatch('render');
    },
    setDpi(resolution) {
      scaleLine.setDpi(resolution.resolution);
    },
    toggleNorthArrow(display) {
      showNorthArrow = !showNorthArrow;
      northArrowComponent.setVisible(display);
    },
    toggleScale(display) {
      const elScale = document.getElementById(mapControlContainers[scaleLinePlacement].getId());
      if (display.showScale === false) {
        elScale.style.display = 'none';
      } else {
        elScale.style.display = 'block';
      }
    },
    addPrintControls() {
      const el = document.getElementById(mapControlContainers[logoPlacement].getId());
      el.appendChild(dom.html(logoComponent.render()));
      const el2 = document.getElementById(mapControlContainers[northArrowPlacement].getId());
      el2.appendChild(dom.html(northArrowComponent.render()));
      northArrowComponent.onRotationChanged();
      northArrowComponent.setVisible({ showNorthArrow });

      scaleLine = new olScaleLine({
        target: mapControlContainers[scaleLinePlacement].getId(),
        bar: true,
        text: true,
        steps: 2
      });
      const attribution = new olAttribution({
        className: 'print-attribution',
        collapsible: false,
        collapsed: false,
        target: mapControlContainers[attributionPlacement].getId()
      });
      mapControls = [scaleLine, attribution];
      map.addControl(scaleLine);
      map.addControl(attribution);
    },
    removePrintControls() { mapControls.forEach((mapControl) => map.removeControl(mapControl)); },
    render() {
      return `
      <div class="flex grow relative no-margin width-full height-full">
        ${mapControlContainers['top-left'].render()}
        ${mapControlContainers['top-center'].render()}
        ${mapControlContainers['top-right'].render()}
        ${mapControlContainers['bottom-left'].render()}
        ${mapControlContainers['bottom-center'].render()}
        ${mapControlContainers['bottom-right'].render()}
        <div id="${this.getId()}" class="no-margin width-full height-full"></div>
      </div>
      `;
    }
  });
}
