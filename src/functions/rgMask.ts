export function rgMask(value: string) {
  const digitsOnly = value.replace(/\D/g, ''); // Remover todos os caracteres não numéricos

  if (digitsOnly.length !== 11) {
    return 'Número inválido';
  }

  const formattedValue = `${digitsOnly.slice(0, 3)}.${digitsOnly.slice(3, 5)}.${digitsOnly.slice(5, 8)}.${digitsOnly.slice(8, 10)}-${digitsOnly.slice(10, 11)}`;

  return formattedValue;
}
