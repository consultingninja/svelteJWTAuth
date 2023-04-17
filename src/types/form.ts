


export interface registerFormData {
    weakPassword:boolean,
    urlTaken: boolean,
    emailUsed: boolean,
    error:boolean,
    message: string,
    firstName: FormDataEntryValue,
    lastName: FormDataEntryValue,
    email: FormDataEntryValue,
    password: FormDataEntryValue,
    urlChoice:FormDataEntryValue,
    [key:string]: any
}

export interface loginFormData {
    email: FormDataEntryValue,
    password: FormDataEntryValue,
    [key:string]: any
}

export interface loginFormResponse extends Omit<loginFormData, 'password'> {
    error:boolean,
    message: string,
}

export interface adminFormData {
    layout: FormDataEntryValue,
    primary:FormDataEntryValue,
    secondary: FormDataEntryValue,
    text: FormDataEntryValue,
    carousel:FormDataEntryValue | boolean,
    hero:FormDataEntryValue | boolean,
    message:FormDataEntryValue,
    [key:string]: any
}

export interface adminFormResponse extends adminFormData  {
    error: boolean,
    formMessage: string,
}

type layoutOption = 'top' | 'side'