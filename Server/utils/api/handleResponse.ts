import { AxiosResponse } from 'axios';

export const handleResponse = <T = any>(response: AxiosResponse): { success: boolean; data?: T; error?: any } => {
  try {
    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data?.error || 'An unknown error occurred' };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred while processing the response' };
  }
};
