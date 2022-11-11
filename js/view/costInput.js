import updateModel from "../utils/updateModel.js";


function init(getData) {
  const data = getData();

  const input = document.querySelector('#input-cost');

  const settings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
  };

  const cleaveInput = new Cleave(input, settings);
  cleaveInput.setRawValue(data.cost);


  input.addEventListener('input', function() {
    const value = +cleaveInput.getRawValue();

    // Проверка на мин и макс цену недвижимости
    if (value < data.minPrice || value > data.maxPrice) {
      input.closest('.param__details').classList.add('param__details--error');
    }
    if (value >= data.minPrice && value <= data.maxPrice) {
      input.closest('.param__details').classList.remove('param__details--error');
    }

    updateModel(input, {cost: value, onUpdate: 'costInput'})
  });


  input.addEventListener('change', function() {
    const value = +cleaveInput.getRawValue();

    if (value > data.maxPrice) {
      cleaveInput.setRawValue(data.maxPrice);
      input.closest('.param__details').classList.remove('param__details--error');
    }
    if (value < data.minPrice) {
      cleaveInput.setRawValue(data.minPrice);
      input.closest('.param__details').classList.remove('param__details--error');
    }

    updateModel(input, {cost: +cleaveInput.getRawValue(), onUpdate: 'costInput'})
  })

  return cleaveInput;
}

export default init;