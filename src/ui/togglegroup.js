import { createStyle, matches } from './dom/dom';
import Component from './component';

const ToggleGroup = function ToggleGroup(options = {}) {
  const {
    cls: clsOptions = '',
    components = [],
    style: styleOptions = {},
    tagName = 'div'
  } = options;

  const cls = `${clsOptions} toggle-group`.trim();
  const style = createStyle(styleOptions);

  const renderToggleItems = comps => comps.reduce((acc, comp) => acc + comp.render(), '');

  let onClick;

  function toggleHandler(evt) {
    const parent = document.getElementById(this.getId());
    let newActive;
    let oldActive;
    this.getComponents().forEach((component) => {
      if (matches(`#${component.getId()}`, parent, evt.target)) {
        newActive = component;
      }
      if (component.getState() === 'active') {
        oldActive = component;
      }
    });
    if (newActive && (newActive !== oldActive)) {
      newActive.dispatch('change', { state: 'active' });
      if (oldActive) {
        oldActive.dispatch('change', { state: 'initial' });
      }
    }
    evt.preventDefault();
  }

  return Component({
    enable() {
      this.getComponents().forEach(component => component.enable());
      const el = document.getElementById(this.getId());
      el.addEventListener('click', onClick);
    },
    disable() {
      this.getComponents().forEach(component => component.disable());
      const el = document.getElementById(this.getId());
      el.removeEventListener('click', onClick);
    },
    onInit() {
      this.addComponents(components);
      onClick = toggleHandler.bind(this);
    },
    onRender() {
      const el = document.getElementById(this.getId());
      el.addEventListener('click', onClick);
      this.dispatch('render');
    },
    render() {
      return `<div><${tagName} id="${this.getId()}" class="${cls}" style="${style}">
                  ${renderToggleItems(this.getComponents())}
              </${tagName}></div>`;
    }
  });
};

export default ToggleGroup;
