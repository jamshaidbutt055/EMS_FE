import React, { useState } from "react";
import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import { axiosCall } from "../../utilities/axiosAPI";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddExpenseModal = ({ loggedUserId }) => {
  const [open, setOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    userId: loggedUserId,
    title: "",
    amount: 0,
  });

  const resetForm = () => {
    setExpenseForm({
      ...expenseForm,
      title: "",
      amount: 0,
    });
  };
  const handleInputChange = (event) => {
    setExpenseForm({
      ...expenseForm,
      [event.target.name]: event.target.value,
    });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onExpenseSubmit = async (event) => {
    event.preventDefault();
    if (expenseForm.title === "") {
      toast.error("Expense title is required.");
      return;
    }

    let result = await axiosCall("/transactions/add", "post", expenseForm).then(
      (response) => {
        return response.data;
      }
    );
    if (!result.error) {
      toast.success(result.message);
      resetForm();
      handleClose();
    } else toast.error(result.message);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Add Expense
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Add Expense</Typography>
          <Box sx={{ mt: 2 }}>
            <form onSubmit={onExpenseSubmit}>
              <TextField
                sx={{ width: "100%", mb: "10px" }}
                label="Expense Title"
                variant="outlined"
                name="title"
                type="text"
                onChange={handleInputChange}
              />
              <TextField
                sx={{ width: "100%" }}
                label="Amount"
                variant="outlined"
                name="amount"
                value={expenseForm.amount}
                type="number"
                onChange={handleInputChange}
              />
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: "10px" }}
              >
                <Button
                  variant="outlined"
                  sx={{ mr: "10px" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </Button>
                <Button variant="contained" type="submit">
                  Save Expense
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
