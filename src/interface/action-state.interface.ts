/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ActionState<T = any> {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: T;
  data?: any;
  timestamp?: number;
}
