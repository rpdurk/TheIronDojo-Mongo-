import axios from 'axios';
import { useHistory } from 'react-router-dom';
// Create a user
import { useDispatch } from 'react-redux';
import { setViewerToken } from '../Viewer';
export const useCreateUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSaveUser = (formValues) => {
    try {
      axios.post('/auth/signup', formValues).then(({ data }) => {
        console.log('response 👇');
        if (data.error) {
          console.log(`yes errors`, data);
          // TODO: Dispatch error
        } else {
          console.log(`no errors`);
          // SAve user ID and token in localStorage
          dispatch(setViewerToken(data));
          history.push('/dashboard');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return handleSaveUser;
};
