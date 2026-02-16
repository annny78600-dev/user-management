import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { userFormFields } from '../config/userFormConfig';
import type { user } from '../types/user.type';
import { Box, IconButton, Skeleton, Tooltip } from '@mui/material';
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserTableProps {
  users: user[],
  onEdit: (user: user) => void;
  onDelete: (user: user) => void;
  loading: boolean
}

export default function UserTable({ users, onEdit, onDelete, loading }: UserTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: "none",
        border: "1px solid #eee",
      }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
            {userFormFields.map((field) => (
              <TableCell
                key={field.name}
                align="left"
                sx={{ fontWeight: 600 }}
              >
                {field.label}
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: 600 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {userFormFields.map((field) => (
                  <TableCell key={field.name}>
                    <Skeleton variant="text" width="100%" height={30} />
                  </TableCell>
                ))}
                <TableCell>
                  <Skeleton variant="text" width="60%" height={30} />
                </TableCell>
              </TableRow>
            )) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={userFormFields.length + 1}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <InboxOutlinedIcon sx={{ color: "#666" }} />
                  <Box sx={{ color: "#666" }}>
                    No users found
                  </Box>
                </TableCell>
              </TableRow>
            )
              : users?.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
                    transition: "box-shadow 0.3s ease",
                    borderRadius: 2,
                    backgroundColor: "#fff"
                  }}
                >
                  {userFormFields.map((field) => (
                    <TableCell key={field.name} align="left">
                      {row[field.name]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton>
                        <ModeEditIcon color='primary' onClick={() => onEdit(row)} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteIcon color='error' onClick={() => onDelete(row)} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
