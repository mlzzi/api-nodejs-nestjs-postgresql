import { Rating } from './rating.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal')
  price: number;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @OneToOne(() => Rating, { cascade: true })
  @JoinColumn()
  rating: Rating;
}
