import { writable, type Writable } from "svelte/store";
import type { UserName } from "$interfaces/user";

export let userNameStore: Writable<UserName[] | undefined> = writable(undefined);