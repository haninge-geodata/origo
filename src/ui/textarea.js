import Component from './component';
import createStyle from './dom/createstyle';

export default function Textarea(options = {}) {
  const {
    cls = '',
    placeholderText,
    rows = 3,
    cols = 30,
    style: styleSettings = {}
  } = options;
  let {
    value = ''
  } = options;
  const style = createStyle(styleSettings);
  let el;

  const enable = () => {
    el.disabled = false;
    el.classList.remove('disabled');
  };
  const disable = () => {
    el.disabled = true;
    el.classList.add('disabled');
  };

  return Component({
    getValue() { return value; },
    enable,
    disable,
    onRender() {
      el = document.getElementById(this.getId());
      el.addEventListener('keyup', this.onChange.bind(this));
    },
    onChange(evt) {
      value = evt.target.value;
      this.dispatch('change', { value });
    },
    render() {
      return `
      <textarea id="${this.getId()}" placeholder="${placeholderText}" rows="${rows}" cols="${cols}" class="${cls}" style=""${style}>${value}</textarea>
      `;
    }
  });
}
