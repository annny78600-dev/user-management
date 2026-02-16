import { useState } from "react";
import { userFormFields, type CreateUserPayload } from "../config/userFormConfig";
import useUsers from "../hooks/useUsers";
import type { user } from "../types/user.type";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import UserTable from "../components/userTable";
import UserModal from "../components/UserModal";
import UserForm from "../components/userForm";
import CircularProgress from '@mui/material/CircularProgress';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


const UsersPage = () => {
  const { users, createUser, updateUser, deleteUser, loading } = useUsers();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "delete">("create");
  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  const initialformState = userFormFields.reduce(
    (acc, field) => {
      acc[field.name] = "";
      return acc;
    },
    {} as Record<keyof CreateUserPayload, string>
  );

  const [values, setValues] = useState<CreateUserPayload>(initialformState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateUserPayload, string>>
  >({});

  const handleValidate = () => {
    const newErrors: Record<string, string> = {};

    userFormFields.forEach((field) => {
      let value = values[field.name];

      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is Required`;
        return;
      }
      if (field.type === 'email' && value) {
        let emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = `Invalid Email Format`;
        }
      }
      if (field.type === "phone" && value) {
        let phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          newErrors[field.name] = `Phone Number must be 10 digit`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openCreate = () => {
    setMode("create");
    setValues(initialformState);
    setSelectedUser(null);
    setOpen(true);
  };

  const openEdit = (user: user) => {
    setMode("edit");
    const { id, ...rest } = user;
    setValues(rest);
    setSelectedUser(user);
    setOpen(true);
  };

  const openDelete = (user: user) => {
    setMode("delete");
    setSelectedUser(user);
    setOpen(true);
  };

  const handleSubmit = () => {
    if (mode === "delete" && selectedUser) {
      deleteUser(selectedUser.id!);
      setOpen(false);
      return;
    };

    const isValid = handleValidate();

    if (!isValid) return;

    if (mode === "create") {
      createUser(values);
    }

    if (mode === "edit" && selectedUser) {
      updateUser(selectedUser.id!, values);
    }

    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ mt: 6 }}>
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h5">
              User Management
            </Typography>
            <Button variant="contained" onClick={openCreate} >
              Add User
            </Button>
          </Box>
          <UserTable users={users} onEdit={openEdit} onDelete={openDelete} loading={loading} />
          <UserModal
            open={open}
            title={
              mode === "create"
                ? "Add User"
                : mode === "edit"
                  ? "Edit User"
                  : "Delete User"
            }
            onClose={() => { setOpen(false); setErrors({}) }}
            onSubmit={handleSubmit}
            submitLabel={
              mode === "delete"
                ? "Delete"
                : mode === "edit"
                  ? "Update"
                  : "Create"
            }
          >
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.6)",
                  zIndex: 10,
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            )}
            {mode === "delete" ? (
              <Stack direction="column" spacing={2} alignItems="center" textAlign="center">
                <WarningAmberIcon sx={{ fontSize: 60, color: "warning.main" }} />
                <Typography>
                  Are you sure you want to delete this user?
                </Typography>
              </Stack>
            ) : (
              <UserForm
                values={values}
                setValues={setValues}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          </UserModal>
        </Box>
      </Container>

    </>
  );
};

export default UsersPage;
