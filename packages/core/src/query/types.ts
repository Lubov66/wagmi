import type {
  DefaultError,
  InfiniteQueryObserverOptions,
  MutateOptions,
  QueryKey,
} from '@tanstack/query-core'

import type { Evaluate, Omit } from '../types/utils.js'

export type InfiniteQueryOptions<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryData = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
  ///
  options extends InfiniteQueryObserverOptions<
    queryFnData,
    error,
    data,
    queryData,
    queryKey,
    pageParam
  > = InfiniteQueryObserverOptions<
    queryFnData,
    error,
    data,
    queryData,
    queryKey,
    pageParam
  >,
> = Evaluate<
  Omit<options, 'queryFn'> & {
    // `queryFn` doesn't pass through `pageParam` correctly
    queryFn?(
      context: Evaluate<
        Parameters<NonNullable<options['queryFn']>>[0] & {
          pageParam: pageParam
        }
      >,
    ): ReturnType<NonNullable<options['queryFn']>>
  }
>

export type Mutate<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = (
  ...args: Parameters<MutateFn<data, error, Evaluate<variables>, context>>
) => void

export type MutateAsync<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = MutateFn<data, error, Evaluate<variables>, context>

type MutateFn<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = undefined extends variables
  ? (
      variables?: variables,
      options?:
        | Evaluate<MutateOptions<data, error, variables, context>>
        | undefined,
    ) => Promise<data>
  : (
      variables: variables,
      options?:
        | Evaluate<MutateOptions<data, error, variables, context>>
        | undefined,
    ) => Promise<data>

export type ScopeKeyParameter = { scopeKey?: string | undefined }
