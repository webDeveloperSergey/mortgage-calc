let data = {
  selectedProgram: 0.1,
  cost: 12000000,
  minPrice: 375000,
  maxPrice: 100000000,
  minPaymentPercent: 0.15,
  maxPaymentPercent: 0.9,
  paymentPercent: 0.5,
  payment: 6000000,
  getMinPayment: function() {
    return this.cost * this.minPaymentPercent;
  },
  getMaxPayment: function() {
    return this.cost * this.maxPaymentPercent;
  },
  minYear: 1,
  maxYear: 30,
  time: 10,
  programs: {
    base: 0.1,
    it: 0.047,
    gov: 0.067,
    zero: 0.12,
  },
};

let results = {
  rate: data.selectedProgram
};


function getData() {
  return {...data}
}

function setData(newData) {
  // console.log('NewData: ', newData);

  if (newData.onUpdate === 'radioProgram') {
    if (newData.id == 'zero-value') {
      data.minPaymentPercent = 0;
    } else {
      data.minPaymentPercent = 0.15;
    }
  }

  if (newData.onUpdate === 'costInput' || newData.onUpdate === 'costSlider') {
    // Если стоимость меньше макс цены
    if (newData.cost < data.minPrice) newData.cost = data.minPrice;
    // Если стоимость больше макс цены
    if (newData.cost > data.maxPrice) newData.cost = data.maxPrice;

    // Если новая сумма превоначалки меньше, чем допустимый мин платеж
    if (data.payment < data.getMinPayment()) data.payment = data.getMinPayment();
    // Если новая сумма превоначалки больше, чем допустимый макс платеж
    if (data.payment > data.getMaxPayment()) data.payment = data.getMaxPayment();


    data.paymentPercent = (data.payment * 100) / newData.cost / 100;
  }

  if (newData.onUpdate === 'inputPayment') {
    newData.paymentPercent = (newData.payment * 100) / data.cost / 100;

    // Если проценты больше 90%
    if (newData.paymentPercent > data.maxPaymentPercent) {
      newData.paymentPercent = data.maxPaymentPercent;
      newData.payment = data.cost * data.maxPaymentPercent
    }

    // Если проценты меньше 90%
    if (newData.paymentPercent < data.minPaymentPercent) {
      newData.paymentPercent = data.minPaymentPercent;
      newData.payment = data.cost * data.minPaymentPercent
    }
  }

  if (newData.onUpdate === 'paymentSlider') {
    newData.paymentPercent = newData.paymentPercent / 100;
    data.payment = data.cost * newData.paymentPercent;
  }

  if (newData.onUpdate === 'timeInput') {
    if (newData.time > data.maxYear) {
      newData.time = data.maxYear;
    }

    if (newData.time < data.minYear) {
      newData.time = data.minYear;
    }
  }

  data = {
    ...data,
    ...newData
  };

  // Рассчет ипотеки
  const months = data.time * 12;
  const totalAmount = data.cost - data.payment;
  const monthRate = data.selectedProgram / 12;
  const generalRate = (1 + monthRate) ** months;
  const monthPayment = (totalAmount * monthRate * generalRate) / (generalRate - 1);
  const overPayment = monthPayment * months - totalAmount;

  results = {
    rate: data.selectedProgram,
    totalAmount,
    monthPayment,
    overPayment
  };

  // console.log('UpdatedData: ', data)

}

function getResults() {
  return {...results}
}



export { getData, setData, getResults };