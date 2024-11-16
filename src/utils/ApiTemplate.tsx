import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApiTemplateParams {
  jsonData: Record<string, any>;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  baseURL: string;
  endpoint: string;
  isAuthenticationRequired?: boolean;
  hideLogs?: boolean;
  isformData?: boolean;
}

interface ApiResponse {
  statusCode: number;
  data: any;
}

export const apiTemplate = async ({
  jsonData,
  method,
  baseURL,
  endpoint,
  isAuthenticationRequired = false,
  hideLogs = true,
  isformData = false,
}: ApiTemplateParams): Promise<ApiResponse | undefined> => {
  try {
    const token = await AsyncStorage.getItem('TOKEN');

    const formData = new FormData();

    if (isformData) {
      const keysOfFormData = Object.keys(jsonData);
      keysOfFormData.forEach(key => {
        formData.append(key, jsonData[key]);
      });
    }

    const apiHeaders: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': isformData ? 'multipart/form-data' : 'application/json',
    };

    if (isAuthenticationRequired && token) {
      apiHeaders['Authorization'] = `Bearer ${token}`;
    }

    const apiConfig: RequestInit = {
      headers: apiHeaders,
      method,
    };

    if (method === 'POST') {
      apiConfig.body = isformData ? formData : JSON.stringify(jsonData);
    }

    const response = await fetch(baseURL + endpoint, apiConfig);

    try {
      const data = await response.json();
      const statusCode = response.status;

      return { statusCode, data };
    } catch (error) {
      console.error("Error parsing response JSON", error, baseURL + endpoint);
      const statusCode = response.status;
      const data = response;

      if (statusCode === 404) {
        return { statusCode, data: { msg: "Request failed" } };
      }

      return { statusCode, data };
    }
  } catch (e) {
    console.error('API call error', e);
  }
};
