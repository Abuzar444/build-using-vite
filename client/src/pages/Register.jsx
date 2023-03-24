import { useState, useEffect } from 'react';
import { Logo,FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useGlobalContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading,  setupUser, user,loginAuth } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    const currentUser = { name, email, password };
  
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please provide all values");
      return;
    }
    
     if (isMember) {
    setupUser({
      currentUser,
      endPoint: 'login',
      alertText: 'Login Successful! Redirecting...',
    });
  } else {
    setupUser({
      currentUser,
      endPoint: 'register',
      alertText: 'User Created! Redirecting...',
    });
  }
  };

  const toggleMember=()=>{
    setValues({ ...values, isMember: !values.isMember });
  }

  return (
    <Wrapper className='full-page container'>
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>
          {
            values.isMember ? "Login" : "Register"
          }
        </h3>
        {
          !values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )
        }
        {/* email */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button className="btn btn-block" disabled={isLoading} >
          {isLoading ? "loading..." : "submit"}
        </button>
        <button
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: {
                email: 'mthee@gmail.com',
                password: 'secret'
              },
              endPoint: 'login',
              alertText: 'Login Successful! Redirecting...',
            });
          }}
        >
          {isLoading ? "loading..." : "demo user"}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register
