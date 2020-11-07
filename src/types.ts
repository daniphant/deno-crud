export interface User {
    id: number,
    gender: string,
    name: {
        title: string,
        first: string,
        last: string
    },
    email: string,
}