import { ReactNode } from "react";

export interface Column {
	id: string;
	ordinalNo: number;
	title: string;
	type: "string" | "number" | "select";
	width?: number;
}

export interface Data {
	id: string;
	[key: string]: any;
}

export interface State {
	hiddenColumns: { [P in Column["id"]]?: boolean }; //todo: fix type
	searchValue: string;
	groupBy: string;
}

export interface Field {
	EditView: (props: {
		column: Column;
		item: Data;
		value: any;
		onSave: (value: any) => void;
	}) => JSX.Element;
}

export interface Groups {
	[key: string]: Data[];
}
