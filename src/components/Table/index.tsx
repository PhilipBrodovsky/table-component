import { useState } from "react";
import { TableContext, useTable } from "./Context";
import { Column, Data, Groups, State } from "./types";
import { TableData } from "./TableData";
import { TableRow } from "./TableRow";
import { TableGroups } from "./TableGroups";
import { orderColumns } from "./utils";
import Window from "./Window";

interface TableProps<T> {
	data: Array<T & Data>;
	columns: Column[];
	onDataChange: (newData: TableProps<T>["data"]) => void;
}

export function Table<T>(props: TableProps<T>) {
	const { data, columns, onDataChange } = props;

	const [state, setState] = useState<State>({
		hiddenColumns: {},
		searchValue: "",
		groupBy: "",
	});

	const updateState = (newState: Partial<State>) => {
		setState({ ...state, ...newState });
	};

	const updateCell = ({ rowId, colId, value }: { rowId: string; colId: string; value: any }) => {
		const newData = data.map((item) => {
			if (item.id === rowId) {
				return { ...item, [colId]: value };
			}
			return item;
		});
		onDataChange(newData);
	};

	const setGroupColumn = (colId: string) => {
		updateState({ groupBy: colId });
	};

	const getActiveColumns = () => {
		return orderColumns(columns).filter((c) => !state.hiddenColumns[c.id]);
	};

	return (
		<TableContext.Provider
			value={{ data, columns, state, updateCell, setGroupColumn, getActiveColumns }}
		>
			<div className="relative max-w-fit overflow-x-auto shadow-md sm:rounded-lg">
				<div className="p-4 bg-gray-900">
					<div className="">
						{orderColumns(columns).map((column) => {
							return (
								<div className="flex gap-2" key={column.id}>
									<label htmlFor="" className="text-gray-400">
										{column.title}
									</label>
									<input
										checked={state.hiddenColumns[column.id] ?? false}
										type="checkbox"
										className="block p-2 text-sm text-gray-900 border  rounded-lg w-10 bg-gray-50 focus:ring-blue-500  dark:bg-gray-700 border-gray-600 placeholder-gray-400   focus:border-blue-500"
										onChange={(e) =>
											updateState({
												hiddenColumns: {
													...state.hiddenColumns,
													[column.id]: e.target.checked,
												},
											})
										}
									/>
								</div>
							);
						})}
					</div>
					<div className="relative mt-1">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								className="w-4 text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							onChange={(e) =>
								updateState({
									searchValue: e.target.value,
								})
							}
							type="search"
							placeholder="search.."
							id="table-search"
							className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						/>
					</div>
				</div>

				<table className="text-sm w-[450px] table-fixed  text-left text-gray-400 overflow-auto">
					<TableHead />
					<TableBody />
				</table>
			</div>
		</TableContext.Provider>
	);
}

function TableHead() {
	const { setGroupColumn, getActiveColumns } = useTable();
	return (
		<thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
			<tr>
				{getActiveColumns().map((column, i) => (
					<th
						scope="col"
						className="px-6 py-3"
						style={{ width: (column.width ?? 100) + "px" }}
					>
						<div className="flex gap-2 items-center">
							{i === 0 && (
								<input
									id="checkbox-all-search"
									onChange={(e) => setGroupColumn(e.target.checked ? column.id : "")}
									type="checkbox"
									className="w-4 h-4 text-blue-600 rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
								/>
							)}
							{column.title}
						</div>
					</th>
				))}
			</tr>
		</thead>
	);
}

function TableBody() {
	const table = useTable();

	const orderedCollumns = table.columns.sort((a, b) => a.ordinalNo - b.ordinalNo);

	const mainColumn = orderedCollumns[0];

	const rows = table.data.filter((item) => {
		const values = Object.values(item).map((val) =>
			typeof val === "string" ? val.toLowerCase() : val
		);

		return (
			!table.state.searchValue ||
			values.some((value) => value?.toString().includes(table.state.searchValue.toLowerCase()))
		);
	});

	const groups = table.state.groupBy
		? rows.reduce<Groups>((groups, item) => {
				const mainValue = item[mainColumn.id];
				if (groups[mainValue]) {
					groups[mainValue].push(item);
				} else {
					groups[mainValue] = [item];
				}

				return groups;
		  }, {})
		: null;

	if (groups) {
		return <TableGroups groups={groups} />;
	}
	return (
		<Window rowHeight={48}>
			{rows.map((item) => {
				return (
					<TableRow key={item.id}>
						{orderedCollumns
							.filter((c) => !table.state.hiddenColumns[c.id])
							.map((column) => {
								const value = item[column.id];

								return (
									<TableData key={column.id} column={column} item={item}>
										{value}
									</TableData>
								);
							})}
					</TableRow>
				);
			})}
		</Window>
	);
}
