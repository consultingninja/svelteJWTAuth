// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { UserWithoutPassword } from "./types/user";

// for information about these interfaces
declare global {
	namespace App {
		 interface Error {
			code:number,
			message:string,
		 }
		 interface Locals {
			authedUser: UserWithoutPassword | undefined
		 }
		// interface PageData {}
		// interface Platform {}
	}
}
export {};