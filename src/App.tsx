import { useEffect, useState } from "react";

import { Table } from "./components/Table";
import { Column, Data } from "./components/Table/types";

const columns: Column[] = [
	{ id: "col1", ordinalNo: 1, title: "Column 1", type: "string", width: 200 },
	{ id: "col2", ordinalNo: 2, title: "Column 2", type: "number", width: 100 },
	{ id: "col3", ordinalNo: 3, title: "Column 3", type: "select", width: 150 },
];

const defaultData = [
	{ id: "data1", col1: "Value 1", col2: 123, col3: "Option A" },
	{ id: "data2", col1: "Value 2", col2: 456, col3: "Option B" },
	{ id: "data3", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data12", col1: "Value 1", col2: 123, col3: "Option A" },
	{ id: "data22", col1: "Value 2", col2: 456, col3: "Option B" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	{ id: "data32", col1: "Value 3", col2: 789, col3: "Option C" },
	// ... add more data items here ...
];

function App() {
	const [data, setData] = useState<Data[]>(() => {
		const localJsonData = localStorage.getItem("data");
		return localJsonData ? JSON.parse(localJsonData) : defaultData;
	});

	useEffect(() => {
		// localStorage.setItem("data", JSON.stringify(data));
	}, [data]);
	return (
		<>
			<Table onDataChange={(newData) => setData(newData)} data={data} columns={columns} />
		</>
	);
}

export default App;
