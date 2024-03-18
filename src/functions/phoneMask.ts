export const phoneMask = (value = '') => {
	const digitsOnly = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
	if (digitsOnly.length !== 11) {
	  return 'Telefone inválido';
	}
  
	const formattedValue = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
  
	return formattedValue;
  };
  