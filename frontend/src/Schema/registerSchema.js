import * as yup from 'yup';

const usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
const passwordRegex = /^(?=.*[A-Z])[ -~]{8,}$/;

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup
    .string()
    .required('Username is required')
    .matches(usernameRegex, {
      message: 'Please create a valid username.',
    })
    .lowercase('Username should be in lower case.'),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
    .required('Please confirm you password.'),
});
