export class CreateUserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  cep: string;
  address?: Address;
}

export class Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}