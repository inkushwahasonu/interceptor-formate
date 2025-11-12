// api.ts page

import type { IApiResponse, IUser } from "../interface/user";
import { SERVER_URL } from "./config";







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
