
export interface Result<T> {
    succeed: boolean,
    code: number,
    message:String,
    data?: T
}

export interface ResultPage<T> {
    page: number,
    pageSize: number,
    totalSize: number,
    totalPages: number,
    content?: T
}
