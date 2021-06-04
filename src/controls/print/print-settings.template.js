export default function printTemplate({
  id,
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
}) {
  return `
  <div id="${id}" class="flex column no-print padding-x padding-bottom overflow-auto max-height-100">
    ${titleControl ? titleControl.render() : ''}
    ${descriptionControl ? `<div class="padding-top"></div>
    ${descriptionControl.render()}`
    : ''}
    ${sizeControl ? `<div class="padding-top"></div>
    <h6>Storlek</h6>
    ${sizeControl.render()}`
    : ''}
    ${customSizeControl ? `<div class="padding-top"></div>
    ${customSizeControl.render()}`
    : ''}
    ${orientationControl ? `<div class="padding-top"></div>
    <h6>Orientering</h6>
    ${orientationControl.render()}`
    : ''}
    ${resolutionControl ? `<div class="padding-top"></div>
    <h6>Upplösning</h6>
    ${resolutionControl.render()}`
    : ''}
    ${setScaleControl ? `<div class="padding-top"></div>
    ${setScaleControl.render()}`
    : ''}
    ${marginControl ? `<div class="padding-top-large"></div>
    <div class="flex padding-right-small">
      <div class="grow text-normal">Använd marginaler</div>
      ${marginControl.render()}
    </div>`
    : ''}
    ${createdControl ? `<div class="padding-top-large"></div>
    <div class="flex padding-right-small">
      <div class="grow text-normal">Visa skapad tid</div>
      ${createdControl.render()}
    </div>`
    : ''}
    ${showScaleControl ? `<div class="padding-top-large"></div>
    <div class="flex padding-right-small">
      <div class="grow text-normal">Visa skala</div>
      ${showScaleControl.render()}
    </div>`
    : ''}
    ${northArrowControl ? `<div class="padding-top-large"></div>
    <div class="flex padding-right-small">
      <div class="grow text-normal">Visa norrpil</div>
      ${northArrowControl.render()}
    </div>`
    : ''}
    ${rotationControl ? `<div class="padding-bottom-large">
      ${rotationControl.render()}
    </div>`
    : ''}
  </div>`;
}
