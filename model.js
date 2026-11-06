const interestLabels = ['Программирование', 'Анализ данных', 'Организация процессов', 'Дизайн'];

const programs = [
  { name: 'Программная инженерия', profile: [4, 2, 1, 1] },
  { name: 'Анализ данных', profile: [3, 4, 1, 0] },
  { name: 'Бизнес-информатика', profile: [2, 2, 4, 1] },
  { name: 'Дизайн цифровых продуктов', profile: [1, 1, 2, 4] },
];

function rankPrograms(answers) {
  const norm = Math.hypot(...answers);
  if (norm === 0) return [];
  return programs.map(({ name, profile }) => {
    const contributions = answers.map((answer, i) => answer * profile[i]);
    const match = contributions.reduce((sum, item) => sum + item, 0) / (norm * Math.hypot(...profile));
    return { name, contributions, match: Math.min(match, 1) };
  }).sort((a, b) => b.match - a.match);
}
