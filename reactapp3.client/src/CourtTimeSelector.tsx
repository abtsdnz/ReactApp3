import React, { useRef, useEffect, useState } from 'react';
import "./CourtTimeSelector.css";

//let firstSelectedCell: Cell | null = null;

//class Cell extends React.Component<{ rowIndex: number; colIndex: number; setMouseSelectedCells: (toCell: Cell) => void; }> {
//    state = {
//        contents: this.props.rowIndex == this.props.colIndex ? "b" : "",
//        selected: false,
//        inMouseSelection: false,
//        backgroundTD: 'transparent',
//        classTD: '',
//        classDIV: '',
//    };

//    rowIndex: number = this.props.rowIndex;
//    colIndex: number = this.props.colIndex;

//    updateInMouseSelection(setTo: boolean) {
//        if (this.state.contents === "") {
//            this.setState({ inMouseSelection: setTo })
//        } else {
//            setTo = false;
//        }

//        if (setTo === true) {
//            this.setState({ classTD: 'selected' })
//        }
//        else {
//            this.setState({ classTD: '' })
//        }
//    }

//    handleMouseEnter = () => {
//        this.props.setMouseSelectedCells(this);
//        this.setState({ classDIV: 'hoverbg' })
//    };

//    handleMouseLeave = () => {
//        this.props.setMouseSelectedCells(this);
//        this.setState({ classDIV: '' })
//    };

//    handleMouseDown = (event: React.MouseEvent) => {
//        event.preventDefault();
//        event.stopPropagation();

//        firstSelectedCell = this;
//        this.props.setMouseSelectedCells(this);
//    };

//    handleMouseUp = (event: React.MouseEvent) => {
//        event.stopPropagation();

//        firstSelectedCell = null;
//        this.props.setMouseSelectedCells(this);
//    };

//    displayContents = (str: string) => {
//        if (str === "") return "";

//        if (str === "b") return "Booked";
//        if (str === "y") return "You";

//        return str;
//    };

//    render() {
//        return (
//            <td
//                className={this.state.classTD}
//                onMouseEnter={this.handleMouseEnter}
//                onMouseLeave={this.handleMouseLeave}
//                onMouseDown={this.handleMouseDown}
//                onMouseUp={this.handleMouseUp}
//                style={{ padding: 0 }}
//            >
//                <div className={this.state.classDIV}
//                    style={{
//                        width: '100%',
//                        height: '100%',
//                        display: 'flex',
//                        justifyContent: 'center',
//                        alignItems: 'center',
//                        boxSizing: 'border-box',
//                    }}
//                >{this.displayContents(this.state.contents)}</div>
//            </td>
//        );
//    }
//}

//class CellData {
//    cellRef: React.RefObject<Cell>;
//    cell: JSX.Element;

//    constructor(rowIndex: number, colIndex: number, setMouseSelectedCells: (toCell: Cell) => void) {
//        this.cellRef = React.createRef<Cell>();
//        this.cell = <Cell ref={this.cellRef} rowIndex={rowIndex} colIndex={colIndex} setMouseSelectedCells={setMouseSelectedCells} />;
//    }
//}

//interface Row {
//    duration: number;
//}

//interface Court {
//    name: string;
//}

//const initialRows: Row[] = [
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//    { duration: 30 },
//];

//const initialCourts: Court[] = [
//    { name: "Court 1" },
//    { name: "Court 2" },
//    { name: "Court 3" },
//    { name: "Court 4" },
//    { name: "Court 5" },
//];

//const formatTime = (minutes: number, use24Hours: boolean = false, useAM: string = "AM", usePM: string = "PM") => {
//    let hours = Math.floor(minutes / 60);
//    const mins = minutes % 60;

//    if (!use24Hours) {
//        const period = hours >= 12 ? usePM : useAM;
//        hours = hours % 12 || 12; // Adjust for 12-hour format (0 becomes 12)
//        return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${period}`;
//    }

//    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
//};

//interface NowLineRef {
//    SetData: (newTime: string, visibility: string, height: number) => void;
//}

//const NowLine = forwardRef<NowLineRef>((_, ref) => {
//    const [displayTime, setDisplayTime] = useState<string>("");
//    const [visibility, setVisibility] = useState<string>("hidden");
//    const [height, setHeight] = useState<number>(0); // To store height
//    const nowLineRef = useRef<HTMLDivElement | null>(null);

//    useImperativeHandle(ref, () => ({
//        SetData(newTime: string, visibility: string, height: number) {
//            setDisplayTime(newTime);
//            setVisibility(visibility);
//            setHeight(height); // Update height
//        },
//    }));

//    useEffect(() => {
//        if (nowLineRef.current) {
//            nowLineRef.current.style.visibility = visibility;
//            nowLineRef.current.style.height = `${height}px`; // Set height dynamically
//        }
//    }, [visibility, height]); // Run effect when visibility or height changes

//    return (
//        <div ref={nowLineRef} id="nowLine" className="now-line">
//            <span className="time-display">{displayTime}</span>
//        </div>
//    );
//});

//const Scheduler2: React.FC<{}> = () => {
//    const [courts] = useState<Court[]>(initialCourts);
//    const [rows] = useState<Row[]>(initialRows);
//    const [cells, setCells] = useState<CellData[][]>([]);

//    const currentCells = useRef<CellData[][]>([]);

//    const nowLineRef = useRef<NowLineRef>(null);

//    const thRef = useRef<HTMLTableCellElement>(null);
//    const trRef = useRef<(HTMLTableRowElement | null)[]>([]);

//    const updateNowLine = () => {
//        if (thRef.current == null) return;

//        const now = new Date();
//        const currentHour = now.getHours();
//        const currentMinute = now.getMinutes();
//        const headerHeight = thRef.current.offsetHeight;

//        let totalMinutes = (currentHour * 60) + currentMinute;

//        const formattedTime = now.toLocaleTimeString('en-US', {
//            hour: '2-digit', // Display two digits for hours
//            minute: '2-digit', // Display two digits for minutes
//            hour12: true, // Use 12-hour format with AM/PM
//        });

//        nowLineRef.current?.SetData(formattedTime, "visible", headerHeight + totalMinutes);
//    }

//    useEffect(() => {
//        const interval = setInterval(updateNowLine, 100);

//        return () => clearInterval(interval);
//    }, []);

//    useEffect(() => {
//        // Initialize currentCells or sync with the state if necessary
//        currentCells.current = cells;
//        updateNowLine();
//    }, [cells]);

//    const generateCells = () => {
//        const newCells: CellData[][] = [];
//        for (let i = 0; i < rows.length; i++) {
//            const row: CellData[] = [];
//            for (let j = 0; j < courts.length; j++) {
//                row.push(new CellData(i, j, setMouseSelectedCells));
//            }
//            newCells.push(row);
//        }
//        setCells(newCells);
//    };

//    const setMouseSelectedCells = (toCell: Cell) => {
//        let x1 = -1;
//        let x2 = -1;

//        let y1 = -1;
//        let y2 = -1;

//        if (firstSelectedCell !== null) {
//            x1 = firstSelectedCell.colIndex;
//            x2 = toCell.colIndex;

//            y1 = firstSelectedCell.rowIndex;
//            y2 = toCell.rowIndex;

//            if (x1 > x2) {
//                [x1, x2] = [x2, x1]; // Swap x1 and x2 if x1 is greater than x2
//            }

//            if (y1 > y2) {
//                [y1, y2] = [y2, y1]; // Swap y1 and y2 if y1 is greater than y2
//            }
//        }

//        // The code below causes an exception some how ???
//        for (let i = 0; i < currentCells.current.length; i++) {
//            for (let j = 0; j < currentCells.current[i].length; j++) {
//                currentCells.current[i][j]?.cellRef.current?.updateInMouseSelection(j >= x1 && j <= x2 && i >= y1 && i <= y2);
//            }
//        }
//    }

//    React.useEffect(() => {
//        generateCells();
//        updateNowLine();
//    }, [rows, courts]);

//    let minutes: number = 0;

//    return <div className='no-select'>
//        <p><h2>Court Selection</h2></p>
//        <div>
//            <NowLine ref={nowLineRef}/>

//            <table className='FixedColumnFixedRow'>
//                <thead>
//                    <th ref={thRef} className='cursorNotAllowed'>Time</th>
//                    {courts.map((court) => (
//                        <th className='cursorNotAllowed'>{court.name}</th>
//                    ))}
//                </thead>
//                <tbody>
//                    {rows.map((row, rowIndex) => {
//                        if (trRef.current.length <= rowIndex) {
//                            trRef.current.length = rowIndex + 1;
//                        }

//                        const time = formatTime(minutes);
//                        minutes += row.duration; // Update minutes after formatting time

//                        const useClass = row.duration == 60 ? 'hourSlot' : '';

//                        return (
//                            <tr className={useClass} key={`row-${rowIndex}`} ref={(el) => trRef.current[rowIndex] = el}>
//                                <td className='timeSlot fixedColumn'>{time}</td>
//                                {courts.map((_, courtIndex) => (cells[rowIndex]?.[courtIndex]?.cell || <td key={`${rowIndex}-${courtIndex}`}></td>))}
//                            </tr>
//                        );
//                    })}
//                </tbody>
//            </table>
//        </div>
//    </div>
//}

interface Row {
    duration: number;
}

interface Court {
    name: string;
}

const initialRows: Row[] = [
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
    { duration: 30 },
];

const initialCourts: Court[] = [
    { name: "Court 1" },
    { name: "Court 2" },
    { name: "Court 3" },
    { name: "Court 4" },
    { name: "Court 5" },
];

const Scheduler: React.FC<{}> = () => {
    const tableRef = useRef<HTMLTableElement>(null);

    const [courts, setCourts] = useState<Court[]>([]);
    const [rows, setRows] = useState<Row[]>([]);

    const ths = useRef<Map<number, React.RefObject<HTMLTableCellElement>>>(new Map());
    const trs = useRef<Map<[number, number], React.RefObject<HTMLTableRowElement>>>(new Map());

    const BuildScheduler = (courts: Court[], rows: Row[]) => {
        trs.current.clear();

        setCourts(courts);
        setRows(rows);
    };

    async function populateScheduler() {
        try {
            const response = await fetch('schedulerdetails');
            const data = await response.json();
            const { courts, rows }: { courts: Court[], rows: Row[] } = data;
            BuildScheduler(courts, rows);
        } catch (error) {
            console.error("Error fetching scheduler data:", error);
        }
    }

    useEffect(() => {
        BuildScheduler(initialCourts, initialRows);
    }, []);

    return (
        <table ref={tableRef}>
            <thead>
                <tr>
                    <th>Time</th>
                    {courts.map((court, index) => {
                        // Initialize a ref for each <th> if not already present
                        if (!ths.current.has(index)) {
                            ths.current.set(index, React.createRef<HTMLTableCellElement>());
                        }
                        return (<th key={index} ref={ths.current.get(index)} className="cursorNotAllowed">{court.name}</th>);
                    })}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => {
                    return (
                        <tr>
                            <td>zTime
                            </td>
                            <td>
                                <button onClick={populateScheduler}>{row.duration}-{index}</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table >
    );
}

export default Scheduler;