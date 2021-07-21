export interface RawHistory {
  image: string;
  name: string;
  checkIn: string;
  checkOut: string;
  employeeID: string;
  department: string;
}

export interface RawAttendence {
  listNumberOfLate: string[];
  listNumberOfOnTime: string[];
  listRecord: RawHistory[];
  totalLate: number;
  totalLateMinute: number;
  totalOnTime: number;
}

export interface RawTest {
  id: string | number;
  value: string;
}
