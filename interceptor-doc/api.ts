// api.ts page
export interface IUser {
    id: number;
    name: string;
    role: string;
}

export interface IApiResponse<T> {
  data:T;
  message?: string;
  success: boolean;
}

const SERVER_URL = 'Your-server-url';


export const createUser = async (userData:IUser ): Promise<IApiResponse<IUser>> => {
    return await new Promise((resolve, reject) => {
      fetch(`${SERVER_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "Application/Json" },
        body: JSON.stringify(userData),
      })
        .then(async (response) => {
          const res = await response.json();
          if (res.statusCode >= 400) {
            
            reject(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};
