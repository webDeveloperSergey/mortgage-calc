import updateModel from "../utils/updateModel.js";


function init(getData) {
  const data = getData();

  const input = document.querySelector('#input-term');

  const settings = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
  };

  const cleaveInput = new Cleave(input, settings);
  cleaveInput.setRawValue(data.time);


  input.addEventListener('input', function() {
    const value = +cleaveInput.getRawValue();

    // Проверка на мин и макс цену недвижимости
    if (value < data.minYear || value > data.maxYear) {
      input.closest('.param__details').classList.add('param__details--error');
    }
    if (value >= data.minYear && value <= data.maxYear) {
      input.closest('.param__details').classList.remove('param__details--error');
    }

    updateModel(input, {time: value, onUpdate: 'timeInput'})
  });


  input.addEventListener('change', function() {
    const value = +cleaveInput.getRawValue();

    if (value > data.maxYear) {
      cleaveInput.setRawValue(data.maxYear);
      input.closest('.param__details').classList.remove('param__details--error');
    }
    if (value < data.minYear) {
      cleaveInput.setRawValue(data.minYear);
      input.closest('.param__details').classList.remove('param__details--error');
    }

    updateModel(input, {time: +cleaveInput.getRawValue(), onUpdate: 'timeInput'})
  })

  return cleaveInput;
}

export default init;