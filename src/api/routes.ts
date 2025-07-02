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
export const getTodo = async (number = 1) => {
  const response = await makeApiRequest("GET", `/todos?userId=${number}`);
  return response;
};

//DELETE A TODO
export const deleteTodo = async (id: number) => {
  const response = await makeApiRequest("DELETE", `/todos/${id}`);
  return response;
};

//CREATE A TODO
export const postTodo = async (data: unknown) => {
  const response = await makeApiRequest("POST", `/todos`, data);
  return response;
};

//PUT A TODO
export const putTodo = async (data: unknown, id: number) => {
  const response = await makeApiRequest("PUT", `/todos/${id}`, data);
  return response;
};
//PATCH A TODO
export const patchTodo = async (data: unknown, id: number | undefined) => {
  const response = await makeApiRequest("PATCH", `/todos/${id}`, data);
  return response;
};
