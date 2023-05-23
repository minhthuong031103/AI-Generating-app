import axios from 'axios';

axios.defaults.baseURL = 'https://aigeneratingapp.onrender.com';

export async function createPost(form) {
  try {
    const { success } = await axios.post('/api/v1/post', {
      prompt: form.prompt,
      name: form.name,
      photo: form.photo,
    });
    if (success) return Promise.resolve({ success });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
export async function registerUser(user) {
  try {
    const { data, status } = await axios.post('/api/user/createaccount', user);

    //send email
    if (status === 502) return PromiseRejectionEvent.resolve('Email exist');
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
  }
}
