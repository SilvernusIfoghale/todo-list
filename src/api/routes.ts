import client from "./client";

const makeApiRequest = async (
  method: string,
  endpoint: string,
  data?: unknown
) => {
  try {
    const response = await client.request({
      method,
      url: endpoint,
      data,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return console.log(error);
  }
};

//GET TODOS
export const getTodo = async () => {
  const response = await makeApiRequest("GET", `/todo`);
  return response;
};

//DELETE A TODO
export const deleteTodo = async (id: string) => {
  const response = await makeApiRequest("DELETE", `/todo/${id}`);
  return response;
};

//CREATE A TODO
export const postTodo = async (data: unknown) => {
  const response = await makeApiRequest("POST", `/todo`, data);
  return response;
};

//PUT A TODO
export const putTodo = async (data: unknown, id: string) => {
  const response = await makeApiRequest("PUT", `/todo/${id}`, data);
  return response;
};

//PATCH A TODO
export const patchTodo = async (data: unknown, id: string) => {
  const response = await makeApiRequest("PATCH", `/todo/${id}`, data);
  return response;
};
