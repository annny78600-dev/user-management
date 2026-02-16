import type { user } from "../types/user.type";

export type CreateUserPayload = Omit<user, "id">;
export const userFormFields:{
  name: keyof CreateUserPayload;
  label: string;
  required: boolean;
  type: string;
}[]  = [
    {
        name:"firstName",
        label:"First Name",
        required:true,
        type:"text"
    },
    {
        name:"lastName",
        label:"Last Name",
        required:true,
        type:"text"
    },
    {
        name:"phone",
        label:"Phone",
        required:true,
        type:"phone"
    },
    {
        name:"email",
        label:"Email",
        required:true,
        type:"email"
    }

]