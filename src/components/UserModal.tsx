import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface CommonModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  submitLabel?: string;
}

const UserModal = ({
  open,
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = "Submit"
}: CommonModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }
      }}
      BackdropProps={{
        sx: { backgroundColor: "rgba(0,0,0,0.3)" }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, textAlign: title === "Delete User" ? "center" : "left" }}>
        {title}
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        {children}
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: title === "Delete User" ? "center" : "" }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
