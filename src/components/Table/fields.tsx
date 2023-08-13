import { Column, Field } from "./types";

export const fields: { [key in Column["type"]]: Field } = {
	number: {
		EditView(props) {
			return (
				<input
					type="number"
					onBlur={(e) => {
						props.onSave(e.target.value);
					}}
					autoFocus
					defaultValue={props.value}
				/>
			);
		},
	},
	string: {
		EditView(props) {
			return (
				<input
					type="text"
					onBlur={(e) => {
						props.onSave(e.target.value);
					}}
					autoFocus
					defaultValue={props.value}
				/>
			);
		},
	},
	select: {
		EditView(props) {
			// todo: render select element base on coluon options

			return (
				<input
					type="text"
					onBlur={(e) => {
						props.onSave(e.target.value);
					}}
					autoFocus
					defaultValue={props.value}
				/>
			);
		},
	},
};
