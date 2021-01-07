export interface RawHistory {
    boxID: string;
    date: string;
    department: string;
    employeeID: string;
    late: number;
    name: string;
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
