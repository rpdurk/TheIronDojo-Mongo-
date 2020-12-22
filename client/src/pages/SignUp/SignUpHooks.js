import axios from 'axios';
import { useHistory } from 'react-router-dom';
// Create a user
import { useDispatch } from 'react-redux';
import { setViewerToken } from '../Viewer';
import { setCurrentUser } from '../User/UserReducer';
export const useCreateUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSaveUser = formValues => {
    try {
      axios.post('/auth/signup', formValues).then(async ({ data }) => {
        console.log('response 👇');
        if (data.error) {
          console.log(`yes errors`, data);
        } else {
          const user = await axios.get(`/auth/userid/${formValues.email}`);

          console.log(`no errors`);
          // SAve user ID and token in localStorage
          localStorage.setItem('userId', user.data.id); // Save userId  -> Storage
          localStorage.setItem('token', data); // Save Token        -> Storage

          dispatch(setViewerToken(data)); // Sets Token             -> State
          dispatch(setCurrentUser(user.data)); // Sets email and Id  -> State

          history.push('/dashboard');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return handleSaveUser;
};
