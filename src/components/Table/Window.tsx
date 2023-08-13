import React, { RefObject, useCallback, useRef, useState, useEffect } from "react";
import { throttle } from "lodash";
import { useTable } from "./Context";
interface Size {
	width: number;
	height: number;
}

function useEventListener<
	KW extends keyof WindowEventMap,
	KH extends keyof HTMLElementEventMap,
	T extends HTMLElement | void = void
>(
	eventName: KW | KH,
	handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
	element?: RefObject<T>
) {
	// Create a ref that stores handler
	const savedHandler = useRef(handler);

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		// Define the listening target
		const targetElement: T | Window = element?.current || window;
		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}

		// Create event listener that calls handler function stored in ref
		const eventListener: typeof handler = (event) => savedHandler.current(event);

		targetElement.addEventListener(eventName, eventListener);

		// Remove event listener on cleanup
		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element]);
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
	(node: T | null) => void,
	Size,
	T | null
] {
	// Mutable values like 'ref.current' aren't valid dependencies
	// because mutating them doesn't re-render the component.
	// Instead, we use a state as a ref to be reactive.
	const [ref, setRef] = useState<T | null>(null);
	const [size, setSize] = useState<Size>({
		width: 0,
		height: 0,
	});

	// Prevent too many rendering using useCallback
	const handleSize = useCallback(() => {
		setSize({
			width: ref?.offsetWidth || 0,
			height: ref?.offsetHeight || 0,
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref?.offsetHeight, ref?.offsetWidth]);

	useEventListener("resize", handleSize);

	useEffect(() => {
		handleSize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref?.offsetHeight, ref?.offsetWidth]);

	return [setRef, size, ref];
}

export interface WindowProps {
	rowHeight: number;
	children: Array<JSX.Element>;
	gap?: number;
}
const bufferedItems = 2;

const Window: React.FC<WindowProps> = ({ rowHeight, children, gap = 0 }) => {
	const [containerRef, { height: containerHeight, width }] =
		useElementSize<HTMLTableSectionElement>();
	const [scrollPosition, setScrollPosition] = React.useState(0);

	const table = useTable();

	// get the children to be renderd
	const visibleChildren = React.useMemo(() => {
		const startIndex = Math.max(Math.floor(scrollPosition / rowHeight) - bufferedItems, 0);
		const endIndex = Math.min(
			Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) + bufferedItems,
			children.length - 1
		);

		return children
			.filter((c) => !!c)
			.slice(startIndex, endIndex + 1)
			.map((child, index) =>
				React.cloneElement(child, {
					style: {
						position: "absolute",
						top: (startIndex + index) * rowHeight + index * gap,
						height: rowHeight,
						left: 0,
						right: 0,
						lineHeight: `${rowHeight}px`,
					},
				})
			);
	}, [children, containerHeight, rowHeight, scrollPosition, gap]);

	const onScroll = React.useMemo(
		() =>
			throttle(
				function (e: any) {
					setScrollPosition(e.target.scrollTop);
				},
				50,
				{ leading: false }
			),
		[]
	);

	return (
		<tbody
			onScroll={onScroll}
			style={{
				overflowY: "scroll",
				width: table.columns.reduce((sum, c) => sum + (c.width ?? 100), 0),
			}}
			ref={containerRef}
			className=" relative h-96 block"
		>
			{visibleChildren}
		</tbody>
	);
};

export default Window;
