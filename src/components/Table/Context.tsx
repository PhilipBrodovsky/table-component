import { createContext, useContext } from "react";
import { Column, Data, State } from "./types";

interface TableContextType<T = unknown> {
	data: Array<T & Data>;
	columns: Column[];
	state: State;
	setGroupColumn: (id: Column["id"] | "") => void;
	getActiveColumns: () => Column[];
	updateCell: ({ rowId, colId, value }: { rowId: string; colId: string; value: any }) => void;
}
export const TableContext = createContext<TableContextType>({
	columns: [],
	data: [],
	state: { hiddenColumns: {}, groupBy: "", searchValue: "" },
	updateCell: () => {},
	setGroupColumn: () => {},
	getActiveColumns: () => [],
});

export const useTable = () => useContext(TableContext);
