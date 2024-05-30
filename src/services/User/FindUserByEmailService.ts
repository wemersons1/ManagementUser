import dbClient from '../../dbClient';

class FindUserByEmailService {

    async execute(email) {

        return await dbClient.user.findFirst({
                    where: {
                        email
                    }
                });
    }
}

export { FindUserByEmailService }