import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from './entities/products.entitiy';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductsService {

    constructor(
        private readonly httpService: HttpService
    ) {}

    // async findAll(): Promise<Product[]> {
    //     try{
    //         return this.productRepository.find({ relations: ['rating'] });
    //     } catch (error) {
    //         console.log(error);
    //         throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    //     }
    // }
    
    async findAll(): Promise<Product[]> {
        
        try {

            const response = await this.httpService.get('https://fakestoreapi.com/products').toPromise();
            const data = response.data;

            return data;

        } catch (error) {
            console.log(error);
            return null;
        }

    }

}
