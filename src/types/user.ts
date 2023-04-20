import type { ObjectId } from "mongodb"

export interface User {
    _id: ObjectId,
    URL: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    photos: any[],
    options: Options,
    palette:Palette,
    resetTimer: number | null | undefined
}
export interface UserWithoutId extends Omit<User, '_id'> {}
export interface UserWithoutPassword extends Omit<User,'password'>{}

export interface Options {
    layout: string,
    carousel: boolean,
    hero: boolean,
    message: string,
}

export interface Palette {
    primary: string,
    secondary: string,
    text: string
}