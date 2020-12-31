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

export interface RawProductType {
    '$id': string;
    id: string;
    name: string;
    isDeleted: boolean;
}



export interface RawOrderProduct {
    '$id': string;
    idOrder: number;
    idProduct: number;
    name: string;
    description: string;
    unit: string;
    price: number;
    quantity: number;
    inStock: boolean;
    listImage: string;
    type: string;
    manufacture: string;
    isStock: boolean;
    ngayCapNhat?: any;
    gioCapNhat?: any;
}
export interface RawCustomNotify {
    '$id': string;
    contentHTML: string;
    id: number;
    isDeleted: boolean;
}
