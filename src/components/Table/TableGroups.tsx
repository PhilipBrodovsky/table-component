import { useState } from "react";
import { useTable } from "./Context";
import { TableRow } from "./TableRow";
import { Data, Groups } from "./types";
import { TableData } from "./TableData";
import Window from "./Window";

interface Props {
	groups: Groups;
}

export const TableGroups = (props: Props) => {
	const { groups } = props;

	const table = useTable();

	const [open, setOpen] = useState<{ [key: string]: any }>({});

	const orderedCollumns = table.columns.sort((a, b) => a.ordinalNo - b.ordinalNo);

	let rows = Object.entries(groups).reduce<any>((allRows, [colId, items]) => {
		allRows.push(
			<TableRow>
				{orderedCollumns
					.filter((c) => !table.state.hiddenColumns[c.id])
					.map((column, i) => {
						const item = { [table.state.groupBy]: colId };
						const val = item[column.id];
						return (
							<TableData editable={false} key={column.id} item={item} column={column}>
								{i === 0 && (
									<button
										onClick={(e) => {
											e.stopPropagation();
											setOpen({ ...open, [colId]: !open[colId] });
										}}
										style={{
											rotate: open[colId] ? "90deg" : "0deg",
										}}
									>
										{">"}
									</button>
								)}
								{val}
							</TableData>
						);
					})}
			</TableRow>
		);

		if (open[colId] as any) {
			allRows = allRows.concat(
				items.map((item) => (
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
				))
			);
		}

		console.log(allRows);

		return allRows;
	}, []);

	return <Window rowHeight={48}>{rows}</Window>;
};
