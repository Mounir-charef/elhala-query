import { useQuery } from "./useQuery";
import { useMutation } from "./useMutation";
import {
  QueryOptions,
  QueryObserver,
  QueryState,
  QueryStatus,
  QueryKey,
  useQueryOptions,
  MutationObserver,
  MutationOptions,
  MutationState,
  MutationKey,
  MutationStatus,
} from "./types";
import { ElhalaClient } from "./elhalaClient";
import { useElhalaClient, ElhalaProvider } from "./client-provider";
import { useSuspenseQuery } from "./useSuspenseQuery";

export {
  ElhalaClient,
  useQuery,
  useElhalaClient,
  ElhalaProvider,
  useMutation,
  useSuspenseQuery,
};
export type {
  QueryOptions,
  QueryObserver,
  QueryState,
  QueryStatus,
  QueryKey,
  useQueryOptions,
  MutationObserver,
  MutationOptions,
  MutationState,
  MutationKey,
  MutationStatus,
};
