import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import "./CourtTimeSelector.css";

let firstSelectedCell: Cell | null = null;

class Cell extends React.Component<{ rowIndex: number; colIndex: number; setMouseSelectedCells: (toCell: Cell) => void; }> {
    state = {
        contents: this.props.rowIndex == this.props.colIndex ? "b" : "",
        selected: false,
        inMouseSelection: false,
        backgroundTD: 'transparent',
        classTD: '',
        classDIV: '',
    };

    rowIndex: number = this.props.rowIndex;
    colIndex: number = this.props.colIndex;

    updateInMouseSelection(setTo: boolean) {
        if (this.state.contents === "") {
            this.setState({ inMouseSelection: setTo })
        } else {
            setTo = false;
        }

        if (setTo === true) {
            this.setState({ classTD: 'selected' })
        }
        else {
            this.setState({ classTD: '' })
        }
    }

    handleMouseEnter = () => {
        this.props.setMouseSelectedCells(this);
        this.setState({ classDIV: 'hoverbg' })
    };

    handleMouseLeave = () => {
        this.props.setMouseSelectedCells(this);
        this.setState({ classDIV: '' })
    };

    handleMouseDown = (event: React.MouseEvent) => {
        document.addEventListener('mouseup', this.handleMouseUpDocument);

        event.preventDefault();
        event.stopPropagation();

        // Capture mouse 

        firstSelectedCell = this;
        this.props.setMouseSelectedCells(this);
    };

    handleMouseUpDocument(event: MouseEvent) {
        document.removeEventListener('mouseup', this.handleMouseUpDocument);

        if (firstSelectedCell == null) return;

        event.stopPropagation();

        firstSelectedCell.props.setMouseSelectedCells(this);

        firstSelectedCell = null;
    }

    handleMouseUp = (event: React.MouseEvent) => {
        document.removeEventListener('mouseup', this.handleMouseUpDocument);

        if (firstSelectedCell == null) return;

        event.stopPropagation(); // This does not get call if I move to another element, it should caputure mouse

        firstSelectedCell = null;
        this.props.setMouseSelectedCells(this);
    };

    displayContents = (str: string) => {
        if (str === "") return "";

        if (str === "b") return "Booked";
        if (str === "y") return "You";

        return str;
    };

    render() {
        return (
            <td
                className={this.state.classTD}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                style={{ padding: 0 }}
            >
                <div className={this.state.classDIV}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxSizing: 'border-box',
                    }}
                >{this.displayContents(this.state.contents)}</div>
            </td>
        );
    }
}

class CellData {
    cellRef: React.RefObject<Cell>;
    cell: JSX.Element;

    constructor(rowIndex: number, colIndex: number, setMouseSelectedCells: (toCell: Cell) => void) {
        this.cellRef = React.createRef<Cell>();
        this.cell = <Cell ref={this.cellRef} rowIndex={rowIndex} colIndex={colIndex} setMouseSelectedCells={setMouseSelectedCells} />;
    }
}

interface Row {
    duration: number;
}

interface Court {
    name: string;
}

const initialRows: Row[] = [
    { duration: 60 },
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
    { name: "Court 6" },
    { name: "Court 7" },
    { name: "Court 8" },
    { name: "Court 9" },
    { name: "Court 10" },
    { name: "Court 11" },
    { name: "Court 12" },
    { name: "Court 13" },
    { name: "Court 14" },
    { name: "Court 15" },
    { name: "Court 16" },
    { name: "Court 17" },
    { name: "Court 18" },
    { name: "Court 19" },
    { name: "Court 20" },
    { name: "Court 21" },
    { name: "Court 22" },
    { name: "Court 23" },
    { name: "Court 24" },
    { name: "Court 25" },
    { name: "Court 26" },
    { name: "Court 27" },
    { name: "Court 28" },
];

const formatTime = (minutes: number, use24Hours: boolean = false, useAM: string = "AM", usePM: string = "PM") => {
    let hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (!use24Hours) {
        const period = hours >= 12 ? usePM : useAM;
        hours = hours % 12 || 12; // Adjust for 12-hour format (0 becomes 12)
        return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${period}`;
    }

    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

interface NowLineRef {
    SetData: (newTime: string, visibility: string, left: number, width: number, top: number, height: number) => void;
}

const NowLine = forwardRef<NowLineRef>((_, ref) => {
    const [displayTime, setDisplayTime] = useState<string>("");
    const [visibility, setVisibility] = useState<string>("hidden");
    const [left, setLeft] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [top, setTop] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const nowLineRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        SetData(newTime: string, visibility: string, left: number, width: number, top: number, height: number) {
            setDisplayTime(newTime);
            setVisibility(visibility);
            setLeft(left);
            setWidth(width);
            setTop(top);
            setHeight(height);
        },
    }));

    useEffect(() => {
        if (nowLineRef.current) {
            nowLineRef.current.style.visibility = visibility;
            nowLineRef.current.style.left = `${left}px`;
            nowLineRef.current.style.width = `${width}px`;
            nowLineRef.current.style.top = `${top}px`;
            nowLineRef.current.style.height = `${height}px`;
        }
    }, [visibility, left, width, top, height]); // Run effect when visibility or height changes

    return (
        <div ref={nowLineRef} id="nowLine" className="now-line">
            <span className="time-display">{displayTime}</span>
        </div>
    );
});

const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

const formatDate = (date: Date): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = date.getDate(); // Numeric day, e.g., 18
    const weekday = days[date.getDay()]; // "Monday"
    const month = months[date.getMonth()]; // "Feb"
    const year = date.getFullYear(); // "2024"

    // Add the appropriate ordinal suffix (st, nd, rd, th)
    const ordinalSuffix = (n: number): string => {
        const remainder = n % 10;
        if (Math.floor((n % 100) / 10) === 1) return "th"; // Handle 11th–13th
        if (remainder === 1) return "st";
        if (remainder === 2) return "nd";
        if (remainder === 3) return "rd";
        return "th";
    };

    return `${day}${ordinalSuffix(day)} ${weekday}, ${month}, ${year}`;
};

const Scheduler: React.FC<{}> = () => {
    const [courts] = useState<Court[]>(initialCourts);
    const [rows] = useState<Row[]>(initialRows);
    const [cells, setCells] = useState<CellData[][]>([]);

    const [date, setDate] = useState<Date>(new Date());
    const dateRef = useRef<Date>(date);

    const rowsRef = useRef<Row[]>(initialRows);

    const currentCells = useRef<CellData[][]>([]);

    const nowLineRef = useRef<NowLineRef>(null);

    const tableRef = useRef<HTMLTableElement>(null);
    const thRef = useRef<HTMLTableCellElement>(null);
    const trRef = useRef<(HTMLTableRowElement | null)[]>([]);

    const updateNowLine = () => {
        if (nowLineRef.current == null) return;
        if (tableRef.current == null) return;
        if (dateRef.current == null) return;
        if (thRef.current == null) return;
        if (trRef.current.length < 1) return;


        const now = new Date();

        const visible: boolean = isSameDay(dateRef.current, now);

        if (!visible) {
            nowLineRef.current.SetData("", "hidden", 0, 0, 0, 0);
        }
        else {
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            let totalMinutes = (currentHour * 60) + currentMinute;

            //totalMinutes = (4 * 60) + 10;

            const formattedTime = now.toLocaleTimeString('en-US', {
                hour: '2-digit', // Display two digits for hours
                minute: '2-digit', // Display two digits for minutes
                hour12: true, // Use 12-hour format with AM/PM
            });

            const firstcellWidth: number = tableRef.current.rows[0].cells[0].offsetWidth;

            const left: number = tableRef.current.offsetLeft + firstcellWidth;
            const width: number = tableRef.current.offsetWidth - firstcellWidth;
            const top: number = tableRef.current.offsetTop + thRef.current.clientHeight;

            let i: number = 0;
            while (totalMinutes > 0 && i < rowsRef.current.length && i < trRef.current.length) {
                totalMinutes -= rowsRef.current[i].duration;
                i++;
            }

            let height: number = trRef.current[i]!.offsetTop - thRef.current.offsetHeight;

            height -= trRef.current[i]!.offsetHeight * (-totalMinutes / rowsRef.current[i].duration);

            nowLineRef.current.SetData(formattedTime, "visible", left, width, top, height);
        }
    }

    useEffect(() => {
        const interval = setInterval(updateNowLine, 100);

        // Unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Initialize currentCells or sync with the state if necessary
        currentCells.current = cells;
        updateNowLine();
    }, [cells]);

    const handleResize = () => {
        updateNowLine();
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const generateCells = () => {
        const newCells: CellData[][] = [];
        for (let i = 0; i < rows.length; i++) {
            const row: CellData[] = [];
            for (let j = 0; j < courts.length; j++) {
                row.push(new CellData(i, j, setMouseSelectedCells));
            }
            newCells.push(row);
        }
        setCells(newCells);
    };

    const setMouseSelectedCells = (toCell: Cell) => {
        let x1 = -1;
        let x2 = -1;

        let y1 = -1;
        let y2 = -1;

        if (firstSelectedCell !== null) {
            x1 = firstSelectedCell.colIndex;
            x2 = toCell.colIndex;

            y1 = firstSelectedCell.rowIndex;
            y2 = toCell.rowIndex;

            if (x1 > x2) {
                [x1, x2] = [x2, x1]; // Swap x1 and x2 if x1 is greater than x2
            }

            if (y1 > y2) {
                [y1, y2] = [y2, y1]; // Swap y1 and y2 if y1 is greater than y2
            }
        }

        // The code below causes an exception some how ???
        for (let i = 0; i < currentCells.current.length; i++) {
            for (let j = 0; j < currentCells.current[i].length; j++) {
                currentCells.current[i][j]?.cellRef.current?.updateInMouseSelection(j >= x1 && j <= x2 && i >= y1 && i <= y2);
            }
        }
    }

    const handleLeftArrow = () => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1); // Decrease by 1 day
            return newDate;
        });
    };

    const handleRightArrow = () => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1); // Increase by 1 day
            return newDate;
        });
    };

    React.useEffect(() => {
        dateRef.current = date;
        updateNowLine();
    }, [date]);

    React.useEffect(() => {
        rowsRef.current = rows;
        generateCells();
        updateNowLine();
    }, [rows, courts]);

    let minutes: number = 0;

    const showDate = formatDate(date);

    return <div className='schedulerContainer'>
        <p className="datetime">
            <div>Court Selection: {showDate}</div>
            <button onClick={handleLeftArrow} className="arrow-button">{"<"}</button>
            <button onClick={handleRightArrow} className="arrow-button">{">"}</button>
        </p>
        <div>
            <NowLine ref={nowLineRef} />

            <table ref={tableRef} className='FixedColumnFixedRow'>
                <thead>
                    <th ref={thRef} className='cursorNotAllowed'>Time</th>
                    {courts.map((court) => (
                        <th className='cursorNotAllowed'>{court.name}</th>
                    ))}
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => {
                        if (trRef.current.length <= rowIndex) {
                            trRef.current.length = rowIndex + 1;
                        }

                        const time = formatTime(minutes);
                        minutes += row.duration; // Update minutes after formatting time

                        const useClass = row.duration == 60 ? 'hourSlot' : '';

                        return (
                            <tr className={useClass} key={`row-${rowIndex}`} ref={(el) => trRef.current[rowIndex] = el}>
                                <td className='timeSlot fixedColumn'>{time}</td>
                                {courts.map((_, courtIndex) => (cells[rowIndex]?.[courtIndex]?.cell || <td key={`${rowIndex}-${courtIndex}`}></td>))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default Scheduler;
































// Buddie

//interface Row {
//    duration: number;
//}

//interface Court {
//    name: string;
//}

//interface AllocatedSlot {
//    col: number;
//    row: number;
//    contents: string;
//}

//interface Cell {
//    contents: string;
//}

//const SchedulerCell: React.FC<{
//    contents: string;
//    onMouseEnter?: () => void;
//    onMouseLeave?: () => void;
//    onMouseDown?: () => void;
//    onMouseUp?: () => void;
//    style?: React.CSSProperties;
//}> = ({ contents, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, style }) => {
//    return (
//        <td
//            onMouseEnter={onMouseEnter}
//            onMouseLeave={onMouseLeave}
//            onMouseDown={onMouseDown}
//            onMouseUp={onMouseUp}
//            style={style}
//        >
//            {contents}
//        </td>
//    );
//};

//const Scheduler: React.FC<{}> = () => {
//    const [courts, setCourts] = useState<Court[]>([]);
//    const [rows, setRows] = useState<Row[]>([]);
//    const [cells, setCells] = useState<Cell[][]>([]);

//    const courtsRefs = useRef<(Court[])>([]);
//    const rowsRefs = useRef<(Row[])>([]);
//    const cellsRefs = useRef<(Cell[][])>([]);

//    useEffect(() => {
//        courtsRefs.current = courts;
//        rowsRefs.current = rows;
//        cellsRefs.current = cells;
//    }, [courts, rows, cells]);

//    const BuildScheduler = (courts: Court[], rows: Row[], allocatedSlots: AllocatedSlot[]) => {
//        setCourts(courts);
//        setRows(rows);

//        const newCells: Cell[][] = [];

//        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
//            const rowCells: Cell[] = [];

//            for (let courtIndex = 0; courtIndex < courts.length; courtIndex++) {
//                let i: number = allocatedSlots.findIndex((f) => f.col === courtIndex && f.row === rowIndex);

//                let Contents: string = '';

//                if (i >= 0) {
//                    Contents = allocatedSlots[i].contents;
//                }

//                rowCells.push({ contents: Contents });
//            }

//            // Add the row to the 2D array
//            newCells.push(rowCells);
//        }

//        setCells(newCells);
//    };

//    async function populateScheduler() {
//        try {
//            const response = await fetch('schedulerdetails?date=15-11-2024');

//            // Check if the response is OK (status 200-299)
//            if (!response.ok) {
//                throw new Error('Network response was not ok');
//            }

//            const data = await response.json();
//            const { courts, rows, allocatedSlots }: { courts: Court[], rows: Row[], allocatedSlots: AllocatedSlot[] } = data;

//            // Call BuildScheduler with fetched data
//            BuildScheduler(courts, rows, allocatedSlots);
//        } catch (error) {
//            console.error("Error fetching scheduler data:", error);
//        }
//    }

//    useEffect(() => {
//        populateScheduler();
//    }, []);

//    const formatTime = (minutes: number, use24Hours: boolean = false, useAM: string = "AM", usePM: string = "PM") => {
//        let hours = Math.floor(minutes / 60);
//        const mins = minutes % 60;

//        if (!use24Hours) {
//            const period = hours >= 12 ? usePM : useAM;
//            hours = hours % 12 || 12; // Adjust for 12-hour format (0 becomes 12)
//            return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${period}`;
//        }

//        return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
//    };

//    const handleMouseEnter = (icol: number, irow: number) => {
//        cellsRefs.current[icol][irow].contents = "";
//    };

//    let minutes: number = 0;

//    return (
//        cells.length == 0 ? null :
//            <div>
//                <button onClick={() => populateScheduler()}>Click me</button>
//                <table className='FixedColumnFixedRow'>
//                    <thead>
//                        <tr>
//                            <th>Time</th>
//                            {courts.map((court, index) => {
//                                return (<th key={index} className="cursorNotAllowed">{court.name}</th>);
//                            })}
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {rows.map((row, irow) => {
//                            const time = formatTime(minutes);
//                            minutes += row.duration;

//                            const useClass = row.duration == 60 ? 'hourSlot' : '';

//                            return (
//                                <tr key={irow} className={useClass}>
//                                    <td className='timeSlot fixedColumn'>{time}
//                                    </td>
//                                    {courts.map((_, icourt) => {
//                                        return (<SchedulerCell key={icourt}
//                                            contents={cells[irow][icourt].contents}
//                                            onMouseEnter={() => handleMouseEnter(icourt, irow) }
//                                        />);
//                                    })}
//                                </tr>
//                            );
//                        })}
//                    </tbody>
//                </table >
//            </div>
//    );
//}

//export default Scheduler;