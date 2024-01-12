import axios from 'axios';
import {Result,ResultPage} from './base'

export interface RoleData {
    id?: number,
    nameKey?:string,
    remark?:string,
    authority?: RoleData[],
    created?: string,
    createdName?: string,
    modifiedName?: string
}

export function getAuthorityPage(page: number, pageSize: number,param : RoleData) {
    return axios.post<Result<ResultPage<RoleData>>>(`/authority/page?page=${page}&pageSize=${pageSize}`,param);
}

export function addAuthority(param : RoleData) {
    return axios.post<Result<RoleData>>(`/authority`,param);
}

export function setAuthority(param : RoleData) {
    return axios.put<Result<RoleData>>(`/authority`,param);
}

export function delAuthority(key : string) {
    return axios.delete<Result<RoleData>>(`/authority?key=${key}`);
}
