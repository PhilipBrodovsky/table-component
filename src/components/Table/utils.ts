import { Column } from "./types";

export const orderColumns = (columns: Column[]) => {
	return columns.slice().sort((a, b) => a.ordinalNo - b.ordinalNo);
};
