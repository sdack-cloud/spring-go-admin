import axios from 'axios';
import {Result,ResultPage} from './base'

export interface RoleData {
    id?: number,
    nameKey:String,
    remark:String,
    authority?: RoleData[],
    created?: String,
    createdName?: String,
    modifiedName?: String
}

// 对用户授权
export function setUserAuthority(params: RoleData) {
    return axios.post<Result<RoleData>>('/user/authority', params);
}
// 此角色对应的用户
export function getRoleUserList(roleKey: String) {
    return axios.get<Result<RoleData>>(`/role/userList?roleKey=${roleKey}`)
}
// 用户拥有的角色
export function getUserRole(userId: number) {
    return axios.get<Result<RoleData>>(`/userRole?uid=${userId}`)
}

// 用户拥有的权限
export function getUserAuthority(userId: number) {
    return axios.get<Result<RoleData>>(`/userAuthority?uid=${userId}`)
}
