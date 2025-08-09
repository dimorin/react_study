import { get } from './http';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchUsers() {
  return get(`${BASE_URL}/users`);
}

export async function fetchUserById(userId) {
  return get(`${BASE_URL}/users/${userId}`);
}


