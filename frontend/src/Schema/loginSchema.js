import * as yup from 'yup';
const passwordRegex = /^(?=.*[A-Z])[ -~]{8,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8)
    .matches(passwordRegex, {
      message:
        'Please create a valid password with atleast on uppercase character',
    })
    .required('password is required'),
});
