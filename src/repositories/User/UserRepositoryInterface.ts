interface PayloadUser {
    first_name: string;
    last_name: string;
    birth_day: Date;
    role_id: number;
    email: string;
    password: string;
} 
interface DataUser {
    first_name: string;
    last_name: string;
    birth_day: Date;
    role_id: number;
    email: string;
} 

interface UserRepositoryInterface {
    create(data: PayloadUser): Promise<DataUser>
    // update(data: PayloadUser): Promise<DataUser>
    // get(id: number): Promise<DataUser>
    // list(): Array<DataUser>
    // delete(id: number): void
}

export { UserRepositoryInterface }