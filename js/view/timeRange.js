import updateModel from "./../utils/updateModel.js";

function init(getData) {
  const data = getData();

  const slider = document.querySelector('#slider-term');

  noUiSlider.create(slider, {
    start: data.time,
    connect: 'lower',
    tooltips: true,
    step: 1,
    range: {
      min: data.minYear,
      max: data.maxYear,
    },
    format: wNumb({
      decimals: 0,
      thousand: ' ',
      suffix: ''
    })
  });

  slider.noUiSlider.on('slide', function() {
    let sliderVal = slider.noUiSlider.get()
    sliderVal = sliderVal.split('.')[0];
    sliderVal = parseInt(sliderVal.replace(/ /g, ''));

    updateModel(slider, {time: sliderVal, onUpdate: 'timeSlider'});
  })

  return slider;
}

export default init