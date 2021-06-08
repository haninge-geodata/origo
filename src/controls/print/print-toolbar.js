import { Button, Component } from '../../ui';

const PrintToolbar = function PrintToolbar(options = {}) {
  const {
    printFormats
  } = options;

  const pngButton = Button({
    cls: `light text-smaller padding-left-large${(printFormats.indexOf('png') === -1) ? ' o-hidden' : ''}`,
    text: 'Spara bild'
  });

  const pdfButton = Button({
    cls: `light text-smaller padding-right-large${(printFormats.indexOf('pdf') === -1) ? ' o-hidden' : ''}`,
    text: 'Skapa pdf'
  });

  return Component({
    onInit() {
      this.addComponents([pngButton, pdfButton]);
      pngButton.on('click', this.dispatchExport.bind(this));
      pdfButton.on('click', this.dispatchPrint.bind(this));
    },
    dispatchExport() {
      this.dispatch('PNG');
    },
    dispatchPrint() {
      this.dispatch('PDF');
    },
    onRender() {
      this.dispatch('render');
    },
    render() {
      if (printFormats.length === 0) {
        return '';
      }
      return `
      <div
        class="flex box fixed bottom-center button-group divider-horizontal box-shadow rounded-large bg-inverted z-index-ontop-high no-print"
        style="height: 2rem;"
      >
        ${pngButton.render()}
        ${pdfButton.render()}
      </div>`;
    }
  });
};

export default PrintToolbar;
