import { FC, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { handleResponse } from "@/utils/api/handleResponse";
import { useRouter } from "next/navigation";

const baseUrl = process.env.BASE_URL;
console.log(baseUrl)

interface RegisterResponse {
  token: string
}

interface RegisterProps {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  demographic: {
    gender: string;
    dateOfBirth: Date;
  };
}

interface LoginResponse {
  token: string
}

interface LoginProps {
  email: string, 
  password: string
}

interface VerifyRequestResponse {
    success: boolean,
    message: string,
    code: string
}



export function useAuth() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<User["user"] | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const router = useRouter()

  const register = async (props: RegisterProps): Promise<void> => {
    setLoading(true);
    setIsError(false);
    setError(undefined);
    setSuccess(false);

    try {
      const response: AxiosResponse<RegisterResponse> = await axios.post(
        `http://localhost:4000/auth/register`,
        {firstName: props.name.firstName, lastName: props.name.lastName, email: props.email, password: props.email, gender: props.demographic.gender, dateOfBirth: props.demographic.dateOfBirth},
        {
            headers: {
                "Content-Type": "application/json"
            }
        } 
      );

      handleResponse(response)

      const token = response.data.token

      localStorage.setItem("token", token)

      router.push('/account/verify')

      setSuccess(true); 
    } catch (err) {
      setIsError(true);
      setError("Registration failed"); 
    } finally {
      setLoading(false);
    }
  };

  const login = async (props : LoginProps) : Promise<void>=> {
    setLoading(true);
    try {
      const response : AxiosResponse<LoginResponse> = await axios.post(
        `http://localhost:4000/auth/login`,
        {email: props.email, password: props.password},
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      handleResponse(response)

      const token = response.data.token

      localStorage.setItem("token", token)

      router.push('/dashboard')

    } catch (err) {
      setIsError(true);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async (): Promise<{ authenticated: boolean }> => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setAuthenticated(false);
        return { authenticated: false };
      }
  
      const response: AxiosResponse<UserResponse> = await axios.get(
        "http://localhost:4000/auth/account",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      
      const data = handleResponse(response);
      setUser(data.user);
      setAuthenticated(true);
      return { authenticated: true };
    } catch (error) {
      setIsError(true);
      setError("User Unauthorized");
      setAuthenticated(false);
      return { authenticated: false };
    } finally {
      setLoading(false);
    }
  };

  const token = 'Bearer' + ' ' + localStorage.getItem("token")

  const verifyRequest = async () => {
    try {
      
      const response : AxiosResponse<VerifyRequestResponse> = await axios.post(
        " http://localhost:4000/auth/account/verify/create",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      ) 

      handleResponse(response)



    } catch (error) {
      setIsError(true)
    }
    finally {
      setLoading(false)
    }
  }  

  const verify = async (code: number, redirect?: string ) => {
    try {
      const response : AxiosResponse<VerifyRequestResponse> = await axios.post(
        " http://localhost:4000/auth/account/verify",
        {VerificationCode: code, actionType: "verify"},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      ) 

      handleResponse(response)

      if(redirect) {
        router.push(redirect)
      }

    } catch (error) {

    }
    finally {
      setLoading(false)
    }
  }  

  return { register, login, authenticate, loading, isError, error, success, authenticated, user, verify, verifyRequest };
}
