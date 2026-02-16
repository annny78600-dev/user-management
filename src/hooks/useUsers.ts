import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { user } from "../types/user.type";
import { createUserApi, deleteUserApi, getUsers, updateUserApi } from "../services/userService";

const useUsers = () => {
    const [users, setUsers] = useState<user[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            let data = await getUsers();
            if (data) setUsers(data);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteUserApi(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
            toast.success("User deleted successfully!"); 
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError("Something went wrong");
            toast.error(`Delete failed: ${error || "Unknown error"}`); 
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id: number, data: user) => {
        setLoading(true);
        setError(null);
        try {
            let updatedUser = await updateUserApi(id, data);
            setUsers((prev) =>
                prev.map((user) => (user.id === id ? updatedUser : user))
            );
            toast.success("User updated successfully!"); 
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError("Something went wrong");
            toast.error(`Update failed: ${error || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (data: user) => {
        setLoading(true);
        setError(null);
        try {
            let newUser = await createUserApi(data);
            setUsers((prev) => [...prev, newUser]);
            toast.success("User created successfully!"); 
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError("Something went wrong");
            toast.error(`Create failed: ${error || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        createUser,
        deleteUser,
        updateUser,
        fetchUsers,
        users,
        loading,
        error,
    };
};

export default useUsers;
