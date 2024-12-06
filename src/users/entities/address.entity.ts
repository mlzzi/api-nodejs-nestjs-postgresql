import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  bairro: string;

  @Column()
  localidade: string;

  @Column()
  uf: string;
}