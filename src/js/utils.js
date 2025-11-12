export const sayHello = (text) => {
  return text;
};

export function generateId(id) {
  const idNumber = parseInt(id, 10);
  return Math.floor(Math.random(idNumber) * 100);
}

export function pluralize(count) {
  return count === 1 ? "item" : "items";
}
