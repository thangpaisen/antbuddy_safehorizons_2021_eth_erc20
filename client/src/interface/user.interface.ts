export interface userType {
    email: string,
    password: string
}
export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
    T extends (...args: any) => Promise<infer R> ? R : any

export interface userInforType {
    avatar: string,
    create_at: string,
    email: string,
    id: string,
    name: string,
    phone: string,
}