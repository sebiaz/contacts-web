
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/contacts" | "/contacts/create" | "/contacts/[id]" | "/contacts/[id]/edit";
		RouteParams(): {
			"/contacts/[id]": { id: string };
			"/contacts/[id]/edit": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string | undefined };
			"/contacts": { id?: string | undefined };
			"/contacts/create": Record<string, never>;
			"/contacts/[id]": { id: string };
			"/contacts/[id]/edit": { id: string }
		};
		Pathname(): "/" | "/contacts" | "/contacts/create" | `/contacts/${string}` & {} | `/contacts/${string}/edit` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}