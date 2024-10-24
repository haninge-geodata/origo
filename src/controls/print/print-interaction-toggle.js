import {
  Component, Button
} from '../../ui';
import mapInteractions from '../../mapinteractions';

export default function PrintInteractionToggle(options = {}) {
  const {
    map,
    target,
    toggleIcon = '#ic_map_24px',
    mapInteractionsActive,
    pageSettings,
    localize
  } = options;

  const interactions = mapInteractions({ target, mapInteractions: pageSettings && pageSettings.mapInteractions ? pageSettings.mapInteractions : {} });
  let mapInteractionToggleButton;

  const toggleState = function toggleState() {
    if (mapInteractionToggleButton.getState() === 'initial') {
      mapInteractionToggleButton.dispatch('change', { state: 'active' });
    } else {
      mapInteractionToggleButton.dispatch('change', { state: 'initial' });
    }
  };

  const restoreInteractions = function restoreInteractions() {
    if (map.getInteractions() && map.getInteractions().getLength() > 0) {
      map.getInteractions().clear();
    }
    if (interactions) {
      interactions.forEach(interaction => map.addInteraction(interaction));
    }
  };

  const onInitial = function onInitial() {
    map.getInteractions().clear();
  };

  const onActive = function onActive() {
    restoreInteractions();
  };

  return Component({
    onInit() {
      mapInteractionToggleButton = Button({
        cls: 'padding-small icon-smaller round light box-shadow',
        icon: toggleIcon,
        tooltipText: localize('mapInteractionButtonTooltip'),
        tooltipPlacement: 'east',
        state: 'active',
        validStates: ['initial', 'active'],
        style: 'width: fit-content;',
        click() {
          toggleState();
        },
        methods: {
          active: onActive,
          initial: onInitial
        }
      });
      this.addComponent(mapInteractionToggleButton);
    },
    onRender() {
      this.dispatch('render');
    },
    render() {
      if (mapInteractionsActive !== true) {
        onInitial();
        mapInteractionToggleButton.setState('initial');
      }
      return mapInteractionToggleButton.render();
    },
    restoreInteractions
  });
}
