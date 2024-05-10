interface UserRepositoryInterface {
    create(data: object): object
    update(data: object): object
    get(data: object): object
    list(data: object): any
    delete(data: object): void
}