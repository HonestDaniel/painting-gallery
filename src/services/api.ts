import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import { IPainting } from '../models/IPainting';

interface IQuery {
  url: string,
  method: string,
  params?: {
    _limit: number,
    _page: number,
    q: string,
    authorId: number | null,
    locationId: number | null
  },
}

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
    async ({
      url,
      method,
      params,
    }: IQuery) => {
      try {
        const result = await axiosInstance({
          url: baseUrl + url,
          method,
          params,
        });
        return { data: result };
      } catch (axiosError) {
        const err = axiosError as AxiosError<unknown>;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };

const paintingsAPI = createApi({
  reducerPath: 'paitingsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://test-front.framework.team',
  }),
  endpoints: (builder) => ({
    fetchPaitings: builder.query<IPainting[], { limit: number, page: number, q: string, authorId: number | null, locationId: number | null, created_gte: string | undefined, created_lte: string | undefined }>({
      query: ({
        limit,
        page,
        q,
        authorId,
        locationId,
        created_gte,
        created_lte,
      }) => ({
        url: '/paintings',
        method: 'get',
        params: {
          _limit: limit,
          _page: page,
          q,
          authorId,
          locationId,
          created_gte,
          created_lte,
        },
      }),
    }),
    fetchAuthors: builder.query({
      query: () => ({
        url: '/authors',
        method: 'get',
      }),
    }),
    fetchLocations: builder.query({
      query: () => ({
        url: '/locations',
        method: 'get',
      }),
    }),
  }),
});

export default paintingsAPI;

