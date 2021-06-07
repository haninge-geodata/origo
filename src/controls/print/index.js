import { Component, Element as El, Button, dom } from '../../ui';
import PrintComponent from './print-component';

const Print = function Print(options = {}) {
  const {
    icon = '#ic_print_24px',
    placement = ['menu'],
    logo = {},
    northArrow = {},
    settingsAvailable = true,
    settingsIsVisible = false,
    title = 'Skriv ut',
    headerText = '',
    headerPrefix,
    headerHeader = 'Rubrik',
    headerInputMode = 'input',
    headerPlaceholderText = 'Här kan du skriva en rubrik',
    headerAvailable = true,
    headerAlignment = 'center',
    headerSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    headerSize = 'h4',
    headerFormatIsVisible = false,
    headerFormatHidden = false,
    descriptionText = '',
    descriptionPrefix,
    descriptionHeader = 'Beskrivning',
    descriptionInputMode = 'textarea',
    descriptionPlaceholderText = 'Här kan du skriva en beskrivning',
    descriptionAvailable = true,
    descriptionAlignment = 'center',
    descriptionSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    descriptionSize = 'h4',
    descriptionFormatIsVisible = false,
    descriptionFormatHidden = false,
    sizes = {
      a3: [420, 297],
      a4: [297, 210],
      custom: [297, 210]
    },
    sizeInitial = 'a4',
    sizeAvailable = true,
    sizeCustomMinHeight = 50,
    sizeCustomMaxHeight = 420,
    sizeCustomMinWidth = 50,
    sizeCustomMaxWidth = 420,
    orientation = 'portrait',
    orientationAvailable = true,
    resolutions = [
      { label: 'Låg', value: 75 },
      { label: 'Mellan', value: 150 },
      { label: 'Hög', value: 300 }
    ],
    resolution = 150,
    resolutionAvailable = true,
    scales = [],
    scaleInitial,
    setScaleAvailable = true,
    showMargins = true,
    showMarginsAvailable = true,
    showCreated = false,
    showCreatedAvailable = true,
    createdPrefix = '',
    showScale = true,
    showScaleAvailable = true,
    showNorthArrowAvailable = true,
    rotation = 0,
    rotationStep = 1,
    rotationAvailable = true,
    leftFooterText = '',
    filename,
    mapInteractionsActive = false
  } = options;
  let {
    showNorthArrow = true
  } = options;

  let viewer;
  let mapTools;
  let screenButtonContainer;
  let screenButton;
  let mapMenu;
  let menuItem;

  return Component({
    name: 'print',
    onInit() {
      if ('visible' in northArrow) {
        showNorthArrow = northArrow.visible;
      }
    },
    onAdd(evt) {
      viewer = evt.target;
      const printComponent = PrintComponent({
        logo,
        northArrow,
        filename,
        map: viewer.getMap(),
        target: viewer.getId(),
        viewer,
        settingsAvailable,
        settingsIsVisible,
        title: headerText,
        titlePrefix: headerPrefix,
        titleHeader: headerHeader,
        titleInputMode: headerInputMode,
        titlePlaceholderText: headerPlaceholderText,
        titleAvailable: headerAvailable,
        titleAlignment: headerAlignment,
        titleSizes: headerSizes,
        titleSize: headerSize,
        titleFormatIsVisible: headerFormatIsVisible,
        titleFormatHidden: headerFormatHidden,
        description: descriptionText,
        descriptionPrefix,
        descriptionHeader,
        descriptionInputMode,
        descriptionPlaceholderText,
        descriptionAvailable,
        descriptionAlignment,
        descriptionSizes,
        descriptionSize,
        descriptionFormatIsVisible,
        descriptionFormatHidden,
        sizes,
        size: sizeInitial,
        sizeAvailable,
        sizeCustomMinHeight,
        sizeCustomMaxHeight,
        sizeCustomMinWidth,
        sizeCustomMaxWidth,
        orientation,
        orientationAvailable,
        resolutions,
        resolution,
        resolutionAvailable,
        scales,
        scaleInitial,
        setScaleAvailable,
        showMargins,
        showMarginsAvailable,
        showCreated,
        showCreatedAvailable,
        createdPrefix,
        showScale,
        showScaleAvailable,
        showNorthArrow,
        showNorthArrowAvailable,
        rotation,
        rotationAvailable,
        rotationStep,
        leftFooterText,
        mapInteractionsActive
      });
      if (placement.indexOf('screen') > -1) {
        mapTools = `${viewer.getMain().getMapTools().getId()}`;
        screenButtonContainer = El({
          tagName: 'div',
          cls: 'flex column'
        });
        screenButton = Button({
          cls: 'o-print padding-small margin-bottom-smaller icon-smaller round light box-shadow',
          click() {
            printComponent.render();
          },
          icon,
          tooltipText: title,
          tooltipPlacement: 'east'
        });
        this.addComponent(screenButton);
      }
      if (placement.indexOf('menu') > -1) {
        mapMenu = viewer.getControlByName('mapmenu');
        menuItem = mapMenu.MenuItem({
          click() {
            mapMenu.close();
            printComponent.render();
          },
          icon,
          title
        });
        this.addComponent(menuItem);
      }
      this.render();
    },
    render() {
      if (placement.indexOf('screen') > -1) {
        let htmlString = `${screenButtonContainer.render()}`;
        let el = dom.html(htmlString);
        document.getElementById(mapTools).appendChild(el);
        htmlString = screenButton.render();
        el = dom.html(htmlString);
        document.getElementById(screenButtonContainer.getId()).appendChild(el);
      }
      if (placement.indexOf('menu') > -1) {
        mapMenu.appendMenuItem(menuItem);
      }
      this.dispatch('render');
    }
  });
};

export default Print;
