const seed = [
  { id: '1', name: 'Алиса Петрова', email: 'alice@example.com', department: 'Маркетинг', role: 'Lead', salary: 260000, status: 'Активен' },
  { id: '2', name: 'Борис Иванов', email: 'boris@example.com', department: 'Разработка', role: 'Senior Frontend', salary: 320000, status: 'Активен' },
  { id: '3', name: 'Светлана Ли', email: 'svetlana@example.com', department: 'Продажи', role: 'Account Executive', salary: 210000, status: 'Активен' },
  { id: '4', name: 'Дмитрий Орлов', email: 'd.orlov@example.com', department: 'Разработка', role: 'QA', salary: 180000, status: 'В отпуске' },
  { id: '5', name: 'Мария Соколова', email: 'm.sokolova@example.com', department: 'Поддержка', role: 'Support Lead', salary: 160000, status: 'Активен' },
];

let db = [...seed];

const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchEmployees() {
  await delay();
  return [...db];
}

export async function saveEmployee(payload) {
  await delay();
  const existing = db.find((item) => item.id === payload.id);
  if (existing) {
    db = db.map((item) => (item.id === payload.id ? { ...existing, ...payload } : item));
    return payload.id;
  }
  const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  db = [{ ...payload, id }, ...db];
  return id;
}

