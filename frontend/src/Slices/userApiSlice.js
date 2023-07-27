import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users'; // I made a API Calls for Connecting both front-end & back-end



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                body: data,
                method:'POST'
            })
        }),

      
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
           
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                body: data,
                method:'POST'
            })
        }),

        updateUser: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/profile`,
              method: 'PUT',
              body: data,
            }),
          }),


    }),
})


export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation} = userApiSlice;

