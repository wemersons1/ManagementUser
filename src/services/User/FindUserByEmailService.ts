import dbClient from '../../dbClient';

class FindUserByEmailService {

    async execute(email: string) {

        return await dbClient.user.findFirst({
                    where: {
                        email
                    }
                });
    }
}

export { FindUserByEmailService }