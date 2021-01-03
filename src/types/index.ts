export interface RawCamera {
    id: string;
    createdAt: string;
    name: string;
    avatar: string;
    company: string;
    phone: string;
    number: number;
    website: string;
    address: string;
    dob_year: string;
    ip: string;
}

export type FileType = {
    name: string;
    size: number;
    type: string;
    uri: string;
};

export interface RawCustomNotify {
    '$id': string;
    contentHTML: string;
    id: number;
    isDeleted: boolean;
}
