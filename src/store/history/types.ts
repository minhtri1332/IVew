export interface RawHistory {
    boxID: string;
    date: string;
    department: string;
    employeeID: string;
    late: number;
    name: string;
    path: string;
    status: string;
    time: string;
    timestamp: number;
}

export interface RawAttendence {
    listNumberOfLate:string[];
    listNumberOfOnTime:string[];
    listRecord:RawHistory[];
    totalLate: number,
    totalLateMinute: number,
    totalOnTime: number,
}

export interface RawTest {
   id:string|number;
   value:string;
}
