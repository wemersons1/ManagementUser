import dbClient from "../../dbClient";
import { UserRepositoryInterface } from "./UserRepositoryInterface";

interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: string;
    role_id: number;
    email: string;
    password: string;
} 
interface DataUser {
    first_name: string;
    last_name: string;
    years: string;
    role_id: number;
    email: string;
} 
class UserRepository implements UserRepositoryInterface{
    async create(data: PayloadUser): Promise<DataUser> {
        const userCreated = await dbClient.user.create({
            data
        });

        const {     
            first_name,
            last_name,
            birth_day,
            role_id,
            email 
        } = userCreated;

        return {
            first_name,
            last_name,
            years: this.getUserYears(birth_day),
            role_id,
            email
        }
    }

    async update(id: number, data: PayloadUser): Promise<DataUser> {
        const user = await dbClient.user.findFirst({
                where: {
                    id
                }
            });

        if(!user) {
            throw new Error('Usuário não encontrado');
        }

        const userUpdated =  await dbClient.user.update({
                                    where: {
                                        id
                                    },
                                    data
                                });
                            

        const {     
            first_name,
            last_name,
            birth_day,
            role_id,
            email 
        } = userUpdated;

        return {
            first_name,
            last_name,
            years: this.getUserYears(birth_day),
            role_id,
            email
        }
    }
    
    async findUserById(id: number): Promise<DataUser> {
        const user = await dbClient.user.findFirst({
            where: {
                id
            }
        });

        const {     
            first_name,
            last_name,
            birth_day,
            role_id,
            email 
        } = user;

        return {
            first_name,
            last_name,
            years: this.getUserYears(birth_day),
            role_id,
            email
        }
    }

    async findUserByEmail(email: string): Promise<DataUser> {
        const user = await dbClient.user.findFirst({
                    where: {
                        email
                    }
                });

        const {     
            first_name,
            last_name,
            birth_day,
            role_id
        } = user;

        return {
            first_name,
            last_name,
            years: this.getUserYears(birth_day),
            role_id,
            email
        }
    }
    
    // async list(): Array<DataUser> {

    // }
    
    async delete(id: number): Promise<void> {

        try {
            
            const user = await dbClient.user.findFirst({
                where: {
                    id
                }
            });

            if(!user) {
                throw new Error("Usuário não encontrado");
            }
            
             await dbClient.user.delete({
                       where: {
                           id,
                        },
                });
            
          } catch (error) {
            throw new Error(error);
          } 
    }

    private getUserYears(birthDay: string) {
        const dateBirthDay = new Date(birthDay);
        const today = new Date();
        let years = today.getFullYear() - dateBirthDay.getFullYear();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();
        const monthBirthDay = dateBirthDay.getMonth();
        const dayBirthDay = dateBirthDay.getDate();

        if (currentMonth < monthBirthDay || (currentMonth === monthBirthDay && currentDay < dayBirthDay)) {
            years--;
        }

        return `${years} Years`;
    }
}

export { UserRepository };