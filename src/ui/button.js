import Component from './component';
import Icon from './icon';
import { createStyle } from './dom/dom';
import Viewer from '../viewer';
import Origo from '../../origo';

export default function Button(options = {}) {
  let {
    icon,
    state = 'initial',
    text,
    tooltipText,
    tooltipOnStart = false,
    title = ''
  } = options;
  const {
    cls = '',
    methods = {},
    data = {},
    iconCls = '',
    iconStyle = {},
    click,
    style: styleSettings,
    textCls = '',
    tooltipPlacement = 'east',
    validStates = ['initial', 'active', 'disabled', 'inactive', 'loading', 'tracking'],
    ariaLabel = tooltipText || title || ''
  } = options;

  let buttonEl;
  let that;
  const style = createStyle(styleSettings);
  const iconComponent = icon ? Icon({
    icon,
    cls: iconCls,
    style: iconStyle,
    title
  }) : '';

  const getState = () => state;

  const setState = function setState(newState) {
    if (newState !== state && validStates.indexOf(newState) > -1) {
      if (buttonEl) {
        if (state === 'initial') {
          buttonEl.classList.add(newState);
        } else if (newState === 'initial') {
          buttonEl.classList.remove(state);
        } else {
          buttonEl.classList.remove(state);
          buttonEl.classList.add(newState);
        }
      }
      state = newState;
      if (state in methods) {
        methods[state].call(this, buttonEl);
      }
    }
  };

  const getTooltip = () => {

    let dataAttr;
    const mapEl = document.querySelector('body');
    const bookmarkEls = document.querySelectorAll('span[data-tooltip-on-start]');

    if (tooltipOnStart) {
      dataAttr = 'data-tooltip-on-start';
    } else if (tooltipText && !tooltipOnStart) {
      dataAttr = 'data-tooltip';
    }
    mapEl.addEventListener('click', () => {
      bookmarkEls.forEach(element => {
        element.removeAttribute('data-tooltip-on-start');
        // element.setAttribute('data-tooltip', tooltipText);
      });
      
    });
    return `<span ${dataAttr}="${tooltipText}" data-placement="${tooltipPlacement}"></span>`;

  };


  const getInnerHTML = () => {
    if (iconComponent && text) {
      return `<span class="flex row align-center justify-space-between">
                <span class="${textCls} margin-right-small">${text}</span>
                <span class="icon ${iconCls}">${iconComponent.render()}</span>
              </span>`;
    }
    if (iconComponent) {
      return `<span class="icon ${iconCls}">${iconComponent.render()}</span>`;
    }
    return `<span class="${textCls}">${text}</span>`;
  };

  const onChange = function onChange(evt) {
    if (evt.state) {
      setState(evt.state);
    }
    if (evt.text) {
      text = evt.text;
    }
    if (evt.icon) {
      icon = evt.icon;
      iconComponent.setIcon(icon);
    }
    if (evt.text || evt.icon) {
      this.dispatch('update');
    }
  };

  const onUpdate = function onUpdate() {
    const el = document.getElementById(this.getId());
    el.innerHTML = getInnerHTML();
  };

  return Component({
    data,
    getState,
    onInit() {
      that = this;
      this.on('change', onChange.bind(this));
      this.on('update', onUpdate.bind(this));
      if (click) {
        this.on('click', click.bind(this));
        this.on('clear', () => {
          this.un('click', click.bind(this));
        });
      }
    },
    onRender() {
      buttonEl = document.getElementById(this.getId());
      buttonEl.addEventListener('click', (e) => {
        this.dispatch('click');
        e.preventDefault();
      });
      if (validStates.indexOf(state) > 0) {
        buttonEl.classList.add(state);
      }
    },
    render: function render() {
      return `<button id="${this.getId()}" class="${cls} o-tooltip" style="${style}" aria-label="${ariaLabel}">
                ${getInnerHTML()}
                ${getTooltip()}
              </button>`;
    },
    setIcon(newIcon) {
      if (iconComponent) {
        iconComponent.setIcon(newIcon);
      }
    },
    setState
  });
}
