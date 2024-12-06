import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  rate: number;

  @Column()
  count: number;
}
