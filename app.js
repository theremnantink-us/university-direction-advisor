const form = document.querySelector('#questionnaire');
const interests = document.querySelector('#interests');
const result = document.querySelector('#result');
const format = new Intl.NumberFormat('ru', { style: 'percent', maximumFractionDigits: 1 });

interestLabels.forEach((name, index) => {
  const label = document.createElement('label');
  label.textContent = name;
  const select = document.createElement('select');
  select.name = String(index);
  for (let value = 0; value <= 4; value++) select.add(new Option(String(value), String(value)));
  label.append(select);
  interests.append(label);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const answers = Array.from(new FormData(form).values(), Number);
  const ranked = rankPrograms(answers);
  const heading = document.createElement('h2');
  const detail = document.createElement('p');
  heading.textContent = 'Результаты сравнения';
  result.replaceChildren(heading);
  if (!ranked.length) {
    detail.textContent = 'Укажи хотя бы один интерес выше нуля.';
    result.append(detail);
    return;
  }
  const list = document.createElement('ol');
  for (const item of ranked) {
    const row = document.createElement('li');
    row.textContent = item.name + ' — ' + format.format(item.match);
    list.append(row);
  }
  const leading = ranked[0].contributions;
  const strongest = Math.max(...leading);
  const reasons = interestLabels.filter((_, index) => leading[index] === strongest);
  detail.textContent = 'На первый результат больше всего повлияли следующие интересы. ' + reasons.join(', ') + '.';
  result.append(list, detail);
});
