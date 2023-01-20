import { readable } from 'svelte/store';
import moment from "moment";

let momentStore = readable( { moment: moment() });

export { momentStore };