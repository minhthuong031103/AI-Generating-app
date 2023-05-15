import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

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
