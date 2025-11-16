/**
 * Formatea una fecha (string o Date) al formato dd/mm/aaaa.
 * @param {string | Date} dateString - La fecha a formatear.
 * @returns {string} - La fecha formateada o un string de advertencia si es inválida.
 */
export function formatDate(dateString) {
  if (!dateString) {
    return ''; // Devuelve vacío si no hay fecha
  }

  const date = new Date(dateString);

  // Chequeo de fecha inválida
  if (isNaN(date.getTime())) {
    console.warn("Fecha inválida recibida:", dateString);
    return 'Fecha Inválida';
  }

  // Obtenemos las partes
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() es 0-indexado (0 = Enero)
  const year = date.getFullYear();

  // Aseguramos dos dígitos para día y mes, ej: 01, 05, 12
  const paddedDay = String(day).padStart(2, '0');
  const paddedMonth = String(month).padStart(2, '0');

  // Retornamos el formato deseado
  return `${paddedDay}/${paddedMonth}/${year}`;
}

// En el futuro, puedes agregar más helpers aquí, por ejemplo:
// export function formatCurrency(value) { ... }
