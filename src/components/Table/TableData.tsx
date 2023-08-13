import { ReactNode, useState } from "react";
import { Column, Data } from "./types";
import { fields } from "./fields";
import { useTable } from "./Context";

export const TableData = ({
	item,
	column,
	children,
	editable = true,
}: {
	item: Partial<Data>;
	column: Column;
	children: ReactNode;
	editable?: boolean;
}) => {
	const [edit, setEdit] = useState(false);

	const table = useTable();

	const value = item[column.id];

	const Field = fields[column.type];

	const onSave = (newValue: any) => {
		setEdit(false);
		if (!item.id) return;

		table.updateCell({
			value: newValue,
			rowId: item.id,
			colId: column.id,
		});
	};

	return (
		<td
			className="px-4 py-2 h-12"
			style={{
				width: (column.width ?? 100) + "px",
			}}
			onClick={() => editable && !edit && setEdit(true)}
			key={column.id}
		>
			{edit ? (
				<Field.EditView onSave={onSave} column={column} item={item} value={value} />
			) : (
				children
			)}
		</td>
	);
};
