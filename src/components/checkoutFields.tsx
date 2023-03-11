import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type FieldsProps = {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
}

export type CheckoutFieldValues = {
    firstName?: string,
    lastName?: string,
    email?: string,
    address1?: string,
    address2?: string,
    address3?: string,
}

function CheckoutFields({ register, errors }: FieldsProps) {
    return (
        <Box sx={{
            minHeight: 'calc(100vh - 40em)',
            padding: '1em',
            flexGrow: 1,
        }}>
            <Typography variant="h6" gutterBottom sx={{ marginLeft: '1em' }}>Your Details</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '5em',
            }}>
                <TextField
                    required
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    error={!!errors.firstName}
                    {...register("firstName", { required: true })}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    type='text'
                    error={!!errors.lastName}
                    {...register("lastName")}
                />
                <TextField
                    required
                    label="email"
                    variant="outlined"
                    margin="normal"
                    type='email'
                    error={!!errors.email}
                    aria-invalid={!!errors.email}
                    {...register("email", {
                        required: true,
                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address format" },
                    })}
                />
            </Box>

            <Typography variant="h6" gutterBottom sx={{ marginLeft: '1em' }}>Address</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <TextField
                    required
                    label="Address Line 1"
                    variant="outlined"
                    margin="normal"
                    error={!!errors.address1}
                    {...register("address1")}
                />
                <TextField
                    label="Address Line 2"
                    variant="outlined"
                    margin="normal"
                    type='text'
                    error={!!errors.address2}
                    {...register("address2")}
                />
                <TextField
                    required
                    label="Postcode"
                    variant="outlined"
                    margin="normal"
                    type='text'
                    error={!!errors.postcode}
                    aria-invalid={!!errors.postcode}
                    {...register("postcode", { required: true })}
                />
            </Box>
        </Box>
    );
}

export default CheckoutFields;
