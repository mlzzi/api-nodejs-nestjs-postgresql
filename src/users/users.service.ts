import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Address, CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private readonly httpService: HttpService,
  ) {}

  // Get all users with their addresses
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['address'] });
  }

  // Get user by ID with their address
  async findById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id }, relations: ['address'] });
      if (!user) throw new NotFoundException('User not Found!');
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  // Create a new user with address fetched from CEP
  async create(createUserDto: CreateUserDto): Promise<User> {
    const address = await this.getAddressFromCep(createUserDto.cep);
    if (!address) throw new HttpException('Invalid CEP', HttpStatus.BAD_REQUEST);

    const newAddress = this.addressRepository.create(address);
    await this.addressRepository.save(newAddress);

    const newUser = this.userRepository.create({ ...createUserDto, address: newAddress });
    return this.userRepository.save(newUser);
  }

  // Update part or whole of the user
  async update(id: number, createUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not Found!');

    // Atualizar o endereço se um novo CEP for fornecido
    if (createUserDto.cep && createUserDto.cep !== user.address.cep) {
      const address = await this.getAddressFromCep(createUserDto.cep);
      if (!address) throw new HttpException('Invalid CEP', HttpStatus.BAD_REQUEST);
      
      // Atualizar o endereço existente
      Object.assign(user.address, address);
      await this.addressRepository.save(user.address);
    }

    // Atualizar os campos do usuário
    Object.assign(user, createUserDto);

    // Salvar as alterações
    return this.userRepository.save(user);
  }
  
  // Delete user
  async deleteById(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not Found!');

    await this.userRepository.remove(user);
  }

  // Fetch address from CEP using ViaCEP API
  private async getAddressFromCep(cep: string): Promise<Address> {
    try {
      const response = await this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`).toPromise();
      const data = response.data;

      if (data.erro) throw new NotFoundException('CEP not Found');

      return {
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}