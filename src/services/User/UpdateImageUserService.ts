import { inject, injectable } from "tsyringe";
import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";
import fs from 'fs';
import path from 'path';

interface DataUser {
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
    image: string;
} 

@injectable()
class UpdateImageUserService {
    constructor(@inject('UserRepository') private userRepository: UserRepositoryInterface) {}

    async execute(id: number, data: any): Promise<DataUser> {
        const existUser = await this.userRepository.findUserById(+id);

        if(!existUser) {
            throw new Error('Usuário não encontrado');
        }

        this.deleteOldImage(existUser.image);

        return {
            first_name: existUser.first_name,
            last_name: existUser.last_name,
            years: existUser.years,
            role_id: existUser.role_id,
            email: existUser.email,
            image: existUser.image
        };
    }

    private deleteOldImage(image) {
        const filePath = path.join(__dirname + '../../../../' + '/uploads/', image);
        fs.stat(filePath, (err, stats) => {
            if (!err) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        throw new Error('Erro ao deletar o arquivo');
                    }
                });
            } 
        });
    }
}

export { UpdateImageUserService };