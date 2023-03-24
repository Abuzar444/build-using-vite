import React, { useState } from 'react'
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useGlobalContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { FormRow } from "../../components";

const Profile = () => {
  const { user, updateUser,isLoading } = useGlobalContext();
const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      toast.error("Please provide all values!");
      return; 
    };

    const currentUser = { name, email, lastName, location };
    updateUser(currentUser);
    toast.success(`user updated!`);
  }

  return (
    <Wrapper>
      <h3>Profile</h3>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-center">
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-block"
            disabled={isLoading}
          >
            {
              isLoading ? "Please wait..." : "Save changes"
            }
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile
