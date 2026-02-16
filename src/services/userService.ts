import axios from "axios";
import type { user } from "../types/user.type";

let APP_URL = 'http://localhost:3000/users';

export const createUserApi = async (data: user): Promise<user> => {
    const res = await axios.post<user>(APP_URL, data);
    return res.data;
}
export const getUsers = async (): Promise<user[]> => {
    const res = await axios.get<user[]>(APP_URL);
    return res.data;
};
export const updateUserApi = async (id: number, data: user): Promise<user> => {
    const res = await axios.put<user>(`${APP_URL}/${id}`, data);
    return res.data;
}
export const deleteUserApi = async (id: number): Promise<user> => {
    const res = await axios.delete<user>(`${APP_URL}/${id}`);
    return res.data;
}
