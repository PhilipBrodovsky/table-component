import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const TableRow = (props: Props) => {
	const { children, ...rest } = props;

	return (
		<tr {...rest} className="border-b table bg-gray-800 border-gray-700  hover:bg-gray-600">
			{children}
		</tr>
	);
};
