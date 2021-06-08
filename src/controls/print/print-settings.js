import {
  Component, Button, Element as El, Collapse
} from '../../ui';
import printSettingsTemplate from './print-settings.template';
import CustomSizeControl from './custom-size-control';
import DescriptionControl from './description-control';
import MarginControl from './margin-control';
import OrientationControl from './orientation-control';
import SizeControl from './size-control';
import TitleControl from './title-control';
import CreatedControl from './created-control';
import NorthArrowControl from './north-arrow-control';
import RotationControl from './rotation-control';
import SetScaleControl from './set-scale-control';
import ResolutionControl from './resolution-control';
import ShowScaleControl from './show-scale-control';

const PrintSettings = function PrintSettings(options = {}) {
  const {
    closeIcon = '#ic_close_24px',
    openIcon = '#ic_tune_24px',
    map,
    settingsIsVisible,
    title,
    titleHeader,
    titleInputMode,
    titlePlaceholderText,
    titleDisabled,
    titleAvailable,
    titleAlignment,
    titleSizes,
    titleSize,
    titleFormatIsVisible,
    titleFormatHidden,
    description,
    descriptionHeader,
    descriptionInputMode,
    descriptionPlaceholderText,
    descriptionDisabled,
    descriptionAvailable,
    descriptionAlignment,
    descriptionSizes,
    descriptionSize,
    descriptionFormatIsVisible,
    descriptionFormatHidden,
    sizes,
    size,
    sizeDisabled,
    sizeAvailable,
    sizeCustomMinHeight,
    sizeCustomMaxHeight,
    sizeCustomMinWidth,
    sizeCustomMaxWidth,
    orientation,
    orientationDisabled,
    orientationAvailable,
    resolutions,
    resolution,
    resolutionDisabled,
    resolutionAvailable,
    scales,
    scaleInitial,
    setScaleDisabled,
    setScaleAvailable,
    showMargins,
    showMarginsDisabled,
    showMarginsAvailable,
    showCreated,
    showCreatedDisabled,
    showCreatedAvailable,
    showScale,
    showScaleDisabled,
    showScaleAvailable,
    showNorthArrow,
    showNorthArrowDisabled,
    showNorthArrowAvailable,
    rotation,
    rotationDisabled,
    rotationAvailable,
    rotationStep
  } = options;

  let headerComponent;
  let contentComponent;
  let openButton;
  let closeButton;
  let printSettingsContainer;
  let customSizeControl;
  let northArrowControl;
  let rotationControl;
  let setScaleControl;

  const toggle = function toggle() {
    if (openButton.getState() === 'hidden') {
      openButton.setState('initial');
      closeButton.setState('hidden');
    } else {
      openButton.setState('hidden');
      closeButton.setState('initial');
    }
    const customEvt = new CustomEvent('collapse:toggle', {
      bubbles: true
    });
    document.getElementById(openButton.getId()).dispatchEvent(customEvt);
  };

  const close = function close() {
    openButton.setState('initial');
    closeButton.setState('hidden');
    const customEvt = new CustomEvent('collapse:collapse', {
      bubbles: true
    });
    document.getElementById(openButton.getId()).dispatchEvent(customEvt);
  };

  return Component({
    close,
    onInit() {
      openButton = Button({
        cls: 'padding-small icon-smaller round light box-shadow',
        icon: openIcon,
        tooltipText: 'Visa inställningar',
        tooltipPlacement: 'east',
        state: `${settingsIsVisible ? 'hidden' : 'initial'}`,
        validStates: ['initial', 'hidden'],
        click() {
          toggle();
        }
      });
      closeButton = Button({
        cls: 'small round margin-top-small margin-right small icon-smaller grey-lightest',
        icon: closeIcon,
        state: `${settingsIsVisible ? 'initial' : 'hidden'}`,
        validStates: ['initial', 'hidden'],
        ariaLabel: 'Stäng',
        click() {
          toggle();
        }
      });
      headerComponent = El({
        cls: 'flex row justify-end',
        style: { width: '100%' },
        components: [openButton, closeButton]
      });

      const orientationControl = orientationAvailable && OrientationControl({ orientation });
      const sizeControl = sizeAvailable && SizeControl({
        initialSize: size,
        sizes: Object.keys(sizes)
      });
      const titleControl = titleAvailable && TitleControl({
        title,
        titleHeader,
        titleInputMode,
        titlePlaceholderText,
        titleAlignment,
        titleSizes,
        titleSize,
        titleFormatIsVisible,
        titleFormatHidden
      });
      const descriptionControl = descriptionAvailable && DescriptionControl({
        description,
        descriptionHeader,
        descriptionInputMode,
        descriptionPlaceholderText,
        descriptionAlignment,
        descriptionSizes,
        descriptionSize,
        descriptionFormatIsVisible,
        descriptionFormatHidden
      });
      const marginControl = showMarginsAvailable && MarginControl({ checked: showMargins });
      const createdControl = showCreatedAvailable && CreatedControl({ checked: showCreated });
      const resolutionControl = resolutionAvailable && ResolutionControl({
        initialResolution: resolution,
        resolutions
      });
      const showScaleControl = showScaleAvailable && ShowScaleControl({ checked: showScale });
      northArrowControl = showNorthArrowAvailable && NorthArrowControl({ showNorthArrow });
      rotationControl = rotationAvailable && map.getView().getConstraints().rotation(180) === 180 && RotationControl({ rotation, rotationStep, map });
      customSizeControl = sizeAvailable && CustomSizeControl({
        minHeight: sizeCustomMinHeight,
        maxHeight: sizeCustomMaxHeight,
        minWidth: sizeCustomMinWidth,
        maxWidth: sizeCustomMaxWidth,
        height: sizes.custom ? sizes.custom[0] : sizeCustomMinHeight,
        width: sizes.custom ? sizes.custom[1] : sizeCustomMinWidth,
        state: size === 'custom' ? 'active' : 'initial'
      });
      setScaleControl = setScaleAvailable && SetScaleControl({
        scales,
        initialScale: scaleInitial
      }, map);

      contentComponent = Component({
        onRender() {
          this.dispatch('render');
          if (orientationControl && orientationDisabled) { orientationControl.disable(); }
          if (sizeControl && sizeDisabled) { sizeControl.disable(); }
          if (titleControl && titleDisabled) { titleControl.disable(); }
          if (descriptionControl && descriptionDisabled) { descriptionControl.disable(); }
          if (marginControl && showMarginsDisabled) { marginControl.disable(); }
          if (createdControl && showCreatedDisabled) { createdControl.disable(); }
          if (resolutionControl && resolutionDisabled) { resolutionControl.disable(); }
          if (showScaleControl && showScaleDisabled) { showScaleControl.disable(); }
          if (northArrowControl && showNorthArrowDisabled) { northArrowControl.disable(); }
          if (rotationControl && rotationDisabled) { rotationControl.disable(); }
          if (setScaleControl && setScaleDisabled) { setScaleControl.disable(); }
        },
        render() {
          return printSettingsTemplate({
            id: this.getId(),
            customSizeControl,
            descriptionControl,
            marginControl,
            orientationControl,
            sizeControl,
            titleControl,
            createdControl,
            northArrowControl,
            rotationControl,
            setScaleControl,
            resolutionControl,
            showScaleControl
          });
        }
      });
      const components = [customSizeControl, marginControl, orientationControl, sizeControl, titleControl, descriptionControl, createdControl, northArrowControl, setScaleControl, resolutionControl, showScaleControl, rotationControl].filter(component => component);
      contentComponent.addComponents(components);
      printSettingsContainer = Collapse({
        expanded: settingsIsVisible,
        cls: 'flex column',
        containerCls: 'collapse-container no-margin height-full',
        collapseX: true,
        collapseY: true,
        headerComponent,
        contentComponent,
        mainCls: 'collapse-scroll'
      });
      this.addComponent(printSettingsContainer);

      if (descriptionControl) {
        descriptionControl.on('change:description', (evt) => this.dispatch('change:description', evt));
        descriptionControl.on('change:descriptionSize', (evt) => this.dispatch('change:descriptionSize', evt));
        descriptionControl.on('change:descriptionAlign', (evt) => this.dispatch('change:descriptionAlign', evt));
      }
      if (marginControl) { marginControl.on('change:check', (evt) => this.dispatch('change:margin', evt)); }
      orientationControl.on('change:orientation', (evt) => this.dispatch('change:orientation', evt));
      if (sizeControl) {
        sizeControl.on('change:size', (evt) => this.dispatch('change:size', evt));
        sizeControl.on('change:size', this.onChangeSize.bind(this));
      }
      if (customSizeControl) { customSizeControl.on('change:size', (evt) => this.dispatch('change:size-custom', evt)); }
      if (titleControl) {
        titleControl.on('change:title', (evt) => this.dispatch('change:title', evt));
        titleControl.on('change:titleSize', (evt) => this.dispatch('change:titleSize', evt));
        titleControl.on('change:titleAlign', (evt) => this.dispatch('change:titleAlign', evt));
      }
      if (createdControl) { createdControl.on('change:check', (evt) => this.dispatch('change:created', evt)); }
      if (northArrowControl) { northArrowControl.on('change:check', (evt) => this.dispatch('change:northarrow', evt)); }
      if (resolutionControl) { resolutionControl.on('change:resolution', (evt) => this.dispatch('change:resolution', evt)); }
      if (setScaleControl) { setScaleControl.on('change:scale', (evt) => this.dispatch('change:scale', evt)); }
      if (showScaleControl) { showScaleControl.on('change:check', (evt) => this.dispatch('change:showscale', evt)); }
    },
    onChangeSize(evt) {
      const visible = evt.size === 'custom';
      customSizeControl.dispatch('change:visible', { visible });
    },
    onRender() {
      if (rotationControl) { rotationControl.setRotation(); }
      this.dispatch('render');
    },
    render() {
      return printSettingsContainer.render();
    }
  });
};

export default PrintSettings;
