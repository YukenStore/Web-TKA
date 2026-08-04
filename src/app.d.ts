declare global {
	namespace App {
		interface Locals {
			user: {
				email: string;
				name: string;
				picture: string;
				slug: string;
			} | null;
		}
	}
}
export {};