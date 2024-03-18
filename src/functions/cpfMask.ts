export const cpfMask = (value: int) => {
	if (!value.length < 11 || !value.length > 11) {
		value = value.replace(/\D/g, ''); // Mantém apenas dígito
		value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Inclue ponto entre o 3 e 4 dígito
		value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Inclue ponto entre o 6 e 7 dígito

		value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Inclue hifen entre o 9 e 10 dígito

		return value;
	}

	return 'cpf inválido';
};