import * as Model from './model.js'

import programs from './view/radioPrograms.js'
import { updateMinPercent } from './view/utils.js'

import costInput from './view/costInput.js'
import costRange from './view/costRange.js'

import paymentInput from './view/paymentInput.js'
import paymentRange from './view/paymentRange.js'

import timeInput from './view/timeInput.js'
import timeRange from './view/timeRange.js'

import updateResultsView from './view/updateResultsView.js'

window.onload = function() {
  const getData = Model.getData;

  // Init programs
  programs(getData);

  // Init Cost
  const cleavCost = costInput(getData);
  const sliderCost = costRange(getData);

  // Init Payment
  const cleavPayment = paymentInput(getData);
  const sliderPayment = paymentRange(getData);

  // Init Time
  const cleavTime = timeInput(getData);
  const sliderTime = timeRange(getData);

  Model.setData({});
  const result = Model.getResults();
  updateResultsView(result);

  document.addEventListener('updateForm', (e) => {
    Model.setData(e.detail);

    // Получение актуальных данных
    const data = Model.getData();
    const results = Model.getResults();

    // Update results block
    updateResultsView(results);

    // Update form
    updateFormAndSlider(data);
  });


  function updateFormAndSlider(data) {
    if (data.onUpdate === 'radioProgram') {
      updateMinPercent(data);

      sliderPayment.noUiSlider.updateOptions({
        range: {
          min: data.minPaymentPercent * 100,
          max: data.maxPaymentPercent * 100
        }
      })
    }

    if (data.onUpdate !== 'costInput') {
      cleavCost.setRawValue(data.cost);
    }

    if (data.onUpdate !== 'costSlider') {
      sliderCost.noUiSlider.set(data.cost);
    }

    if (data.onUpdate !== 'inputPayment') {
      cleavPayment.setRawValue(data.payment);
    }

    if (data.onUpdate !== 'paymentSlider') {
      sliderPayment.noUiSlider.set(data.paymentPercent * 100);
    }

    if (data.onUpdate !== 'timeInput') {
      cleavTime.setRawValue(data.time);
    }

    if (data.onUpdate !== 'sliderTime') {
      sliderTime.noUiSlider.set(data.time);
    }
  }
}