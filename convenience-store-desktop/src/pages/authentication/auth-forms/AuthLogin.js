import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { postRequest } from 'services/apiService';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { useDispatch } from 'react-redux';
import { addNotification } from 'store/reducers/notificationSlice';
// import { addRole } from 'store/reducers/roleSlice';

const AuthLogin = () => {
  const intialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [checked, setChecked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createData = async () => {
    const response = await postRequest("auth/login", formValues);
    console.log(JSON.stringify(response))
    if (response.status == 200) {
      localStorage.setItem('token',JSON.stringify(response.data.access))
      // localStorage.setItem('role',JSON.stringify(response.data.original.user.roles.map(role => role.name)))
      const newNotification = {
        id: Date.now(),
        message: "Login successful!",
        type: "success"
      };
      dispatch(addNotification(newNotification));
      // dispatch(addRole(response.data.original.user.roles.map(role => role.name)))
      navigate('/counter')
    }
    if (response.status == 401) {
      const newNotification = {
        id: Date.now(),
        message: "Incorrect Email or Password!",
        type: "error"
      };
      dispatch(addNotification(newNotification));
    }
    setIsSubmitting(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors(validate(formValues));
  };

const validate = (values) => {
  let errors = {};
  if (!values.username) {
    setIsSubmitting(false);
    errors.username = "Cannot be blank";
  } 
  if (!values.password) {
    setIsSubmitting(false);
    errors.password = "Cannot be blank";
  } else if(values.password.length < 6) {
    setIsSubmitting(false);
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};  

useEffect(() => {
  if (Object.keys(formErrors).length === 0 && isSubmitting) {
      createData();
  }
}, [formErrors]);

  return (
    <>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">User Name</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter username address"
                  />
                  {formErrors.username && (
                    <FormHelperText error id="helper-text-table-username">
                      {formErrors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {formErrors.password && (
                    <FormHelperText error id="helper-text-table-password">
                      {formErrors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
    </>
  );
};

export default AuthLogin;