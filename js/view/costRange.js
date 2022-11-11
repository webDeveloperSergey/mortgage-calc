import updateModel from "./../utils/updateModel.js";

function init(getData) {
  const data = getData();

  const slider = document.querySelector('#slider-cost');

  noUiSlider.create(slider, {
    start: data.cost,
    connect: 'lower',
    tooltips: true,
    step: 1000000,
    range: {
      min: data.minPrice,
      '1%': [400000, 100000],
      '50%': [10000000, 500000],
      max: data.maxPrice,
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

    updateModel(slider, {cost: sliderVal, onUpdate: 'costSlider'});
  })

  return slider;
}

export default init