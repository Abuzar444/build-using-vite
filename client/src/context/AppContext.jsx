import React, { useState, useContext, useReduce, useReducer, useEffect } from "react";
// reducer actions
import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from './actions';

import reducer from "./reducer";
import axios from "axios";
import { toast } from 'react-toastify';

export const initialState = {
  isLoading: false,
  user: null,
  userLoading: true,
  userLocation:'',
  jobLocation:'',
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  // jobLocation
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1'
  });

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
  dispatch({ type: SETUP_USER_BEGIN });
  try {
    const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);

    const { user, location } = data;
    dispatch({
      type: SETUP_USER_SUCCESS,
      payload: { user, location },
    });
    toast.success(alertText)
  } catch (error) {
    dispatch({
      type: SETUP_USER_ERROR
    });
    toast.error(error.response.data.msg)
  }
  };
  
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location,  }
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR
        });
        toast.error(error.response.data.msg)
      }
    };
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value }
    });
  };

  const clearValues = () => {
    dispatch({type:CLEAR_VALUES})
  }

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      const venom = {
        position, company, jobLocation, jobType, status
      };
       await authFetch.post('/jobs', venom);
      dispatch({
      type: CREATE_JOB_SUCCESS,
      });
      toast.success("Successfully created a job!")
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: CREATE_JOB_ERROR })
      toast.error(error.response.data.msg)
    }
  }

  const getJobs = async () => {
    const { search, searchStatus, searchType, sort, page } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
  if (search) {
    url = url + `&search=${search}`;
  }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { totalJobs, jobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { totalJobs, jobs, numOfPages }
      });
    } catch (error) {
      toast.error(error.response.data.msg);
      logoutUser();
    }
    clearValues();
  }
  

  const setEditJob = (id) => {
    dispatch({
      type: SET_EDIT_JOB,
      payload: { id }
    });
  };

  const deleteJob = async (id) => {
    dispatch({
      type: DELETE_JOB_BEGIN
    });
    try {
      const resp = await authFetch.delete(`/jobs/${id}`);
      toast.success(resp.data.msg);
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;
      toast.error(error.response.data.msg);
    }
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status
      });
      dispatch({
        type: EDIT_JOB_SUCCESS
      });

      dispatch({type:CLEAR_VALUES});
    } catch (error) {
      if (error.status === 401) return;
      dispatch({ type: EDIT_JOB_ERROR });
      toast.error(error.response.data.msg);
    }
  }

  const showStats = async () => {
    dispatch({
      type: SHOW_STATS_BEGIN
    });
    try {
      const { data } = await authFetch.get("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications
        }
      });
    } catch (error) {
      logoutUser();
    }
    clearValues();
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  }

  const getCurrentUser = async () => {
    dispatch({
      type: GET_CURRENT_USER_BEGIN
    });
    try {
      const { data } = await authFetch.get('/auth/getCurrentUser');
      const { user, location } = data;
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location }
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser()
    };
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider value={{
      ...state,
      setupUser,
      toggleSidebar,
      logoutUser,
      updateUser,
      handleChange,
      clearValues,
      createJob,
      getJobs,
      setEditJob,
      deleteJob,
      editJob,
      showStats,
      clearFilters,
       changePage,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppProvider, AppContext };

