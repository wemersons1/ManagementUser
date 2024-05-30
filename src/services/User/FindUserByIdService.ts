import dbClient from '../../dbClient';

class FindUserByIdService {

    async execute(id) {

        return await dbClient.user.findFirst({
                    where: {
                        id
                    }
                });
    }
}

export { FindUserByIdService }