import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
        .catch(error => { throw error });
};

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


export default { getAll, create, update, deletePerson };
