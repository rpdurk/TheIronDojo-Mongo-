import { useUtils } from '../common';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setViewerToken } from '../Viewer';
import { setCurrentUser, invalidCredentials } from '../User/UserReducer';

export const useFetchUser = () => {
  const { dispatch } = useUtils();
  const history = useHistory();

  const signIn = async (email, password) => {
    console.log('ANYTHING!!!!');
    try {
      const res = await axios.post('/auth/signin', { email, password });
      //TODO: fix
      const user = await axios.get(`/auth/userid/${email}`);

      localStorage.setItem('userId', user.data.id); // Save userId  -> Storage
      localStorage.setItem('token', res.data); // Save Token        -> Storage

      dispatch(setViewerToken(res.data)); // Sets Token             -> State
      dispatch(setCurrentUser(user.data)); // Sets email and Id  -> State

      history.push('/dashboard');
    } catch (e) {
      console.log(e);
      // console.log(e.response.status === 401)

      if (typeof e.response !== 'undefined' && e.response.status === 401) {
        dispatch(invalidCredentials());
      }

      console.log(e);

      // Dispatch Error HERE
      // throw new Error(e);
    }
  };

  return signIn;
};
