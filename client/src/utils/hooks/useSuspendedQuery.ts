import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

// 버전: "@tanstack/react-query": "^4.22.0",
// @tanstack/query-core types.d.ts
// export declare type QueryStatus = 'loading' | 'error' | 'success';
// toss/useSuspendedQuery.ts는 "react-query": "^3.19.5" 버전을 사용
// 따라서, toss에는 status에 idle 상태가 있음
interface BaseSuspendedUseQueryResult<TData>
  extends Omit<
    UseQueryResult<TData>,
    "error" | "isLoading" | "isError" | "isFetching"
  > {
  data: TData;
  status: "success";
}

const useSuspendedQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "suspense"
  >
) => {
  return useQuery(queryKey, queryFn, {
    ...options,
    suspense: true,
  }) as BaseSuspendedUseQueryResult<TData>;
};

export default useSuspendedQuery;

/* useQuery.d.ts
export declare function useQuery<
TQueryFnData = unknown,
TError = unknown,
TData = TQueryFnData,
TQueryKey extends QueryKey = QueryKey
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData?: () => undefined;
}): UseQueryResult<TData, TError>;
*/

/* toss/useSuspendedQuery.ts
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) {
  return useQuery(queryKey, queryFn, { ...options, suspense: true }) as BaseSuspendedUseQueryResult<TData>;
*/
