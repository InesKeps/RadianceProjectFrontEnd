export type ApiError = {
  message: string | null | undefined;
  statusCode?: number;
  fields?: Record<string, unknown>;
};

export interface Meta {
  message: string;
  status: number;
}

export interface ApiResponse<T> {
  meta: Meta;
  data: T;
  error: unknown;
}

export type statusType = "idle" | "pending" | "succeeded" | "failed";
