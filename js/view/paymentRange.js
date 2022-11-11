import updateModel from "./../utils/updateModel.js";

function init(getData) {
  const slider = document.querySelector('#slider-downpayment');

  noUiSlider.create(slider, {
    start: getData().paymentPercent * 100,
    connect: 'lower',
    tooltips: true,
    step: 1,
    range: {
      min: getData().minPaymentPercent * 100,
      max: getData().maxPaymentPercent * 100,
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

    updateModel(slider, {paymentPercent: sliderVal, onUpdate: 'paymentSlider'});
  })

  return slider;
}

export default init