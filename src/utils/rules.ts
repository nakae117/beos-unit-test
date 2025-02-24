export default
  {
    required: (value: string | number) => !!value || 'Campo requerido.',
    name: (value: string) => /^[A-Za-z\s]+$/.test(value) || 'Solo letras, sin números o caracteres especiales.',
    email: (value: string) => {
      const pattern = /^[^@]+@[^@]+\.[^@]+$/;
      return pattern.test(value) || 'Formato de email inválido.';
    },
    phone: (value: string) => {
      if (value) {
        return /^\d{11}$/.test(value) || 'Formato de teléfono incorrecto (ej. 04141234567).'
      }
      else return true
    },
    identity: (value: string) => /^[VE]-?\d{7,8}$/.test(value) || 'Cédula debe comenzar con V o E y contener 7 a 8 dígitos.',
    age: (value: number) => {
      if (value) {
        return (value >= 4 && value <= 99) || 'Edad debe ser entre 4 y 99.'
      }
      else return true
    },
    grade: (value: string) => /^[A-Za-z\s]+$/.test(value) || 'Solo letras.',
    address: (value: string) => value.length <= 50 || 'Máximo 50 caracteres.',
    number: (value: number) => !isNaN(value) || 'Debe ser un valor numérico.',
  };