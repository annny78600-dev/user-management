import { Stack, TextField } from "@mui/material";
import { userFormFields, type CreateUserPayload } from "../config/userFormConfig";

interface UserFormProps {
    values: CreateUserPayload;
    setValues: React.Dispatch<React.SetStateAction<CreateUserPayload>>;
    errors: Partial<Record<keyof CreateUserPayload, string>>;
    setErrors: React.Dispatch<
    React.SetStateAction<Partial<Record<keyof CreateUserPayload, string>>>
  >;
}


const UserForm = ({ values, setValues, errors,setErrors }: UserFormProps) => {
    const handleChange = (key: keyof CreateUserPayload, val: string) => {
        setValues((prev) => ({
            ...prev,
            [key]: val
        }));

        setErrors((prev) => ({
            ...prev,
            [key]: "",
        }));
    }
    return (
        <>
            <Stack spacing={3} sx={{ mt: 1 }}>
                {userFormFields.map((field) => (
                    <TextField
                        key={field.name}
                        fullWidth
                        value={values[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        label={field.label}
                        required={field.required}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]}
                    />
                ))}
            </Stack>
        </>
    )
}
export default UserForm;