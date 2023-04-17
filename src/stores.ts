
import { writable , derived} from "svelte/store";
import {page} from '$app/stores'
import { CheckUserStyledPage } from "./backendUtils";
import type { User,UserWithoutPassword } from "./types/user";
import type { Writable } from "svelte/store";


export const showModal = writable(false);


export const authToken:Writable<string|undefined> = writable(undefined);

export const user:Writable<UserWithoutPassword|undefined> = writable(undefined);

export const layout = writable('top');

export const carousel = writable(false);
export const hero = writable(false);
export const message = writable('');

export const primaryColor = writable('#242424');
export const secondaryColor = writable('#FFFFFF');
export const textColor = writable('#FFFFFF');

export const isOnUserStyledPage = derived(page, $page => CheckUserStyledPage($page.url.toString()))

