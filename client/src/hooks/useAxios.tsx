import { useCallback, useEffect, useState } from "react"
import axios, { type AxiosInstance, type AxiosRequestConfig} from "axios"

interface configTypeObj {
   axiosInstance: AxiosInstance;
   method: string
   url: string;
   requestConfig?: AxiosRequestConfig;
}

type UseAxiosResult<T> = [
   response: T | null,
   error: string,
   loading: boolean,
   fetchData: (config?: configTypeObj) => Promise<void>
]

function useAxios<T=any>(): UseAxiosResult<T> {
   const [response, setResponse] = useState<T|null>(null);
   const [error, setError] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const [controller, setController] = useState<AbortController>()
   const [config, setConfig] = useState<AxiosRequestConfig>()

   const fetchData = useCallback(async (configObj?: configTypeObj) => {
      setLoading(true);
      setError('')
      const ctrl = new AbortController()
      setController(ctrl)
      try {
         const mergeConfig = {...config, ...configObj?.requestConfig}
         const res = await configObj?.axiosInstance.request({ 
            url: configObj?.url, 
            method: configObj?.method.toLowerCase(), 
            ...mergeConfig, 
            signal: ctrl.signal 
         });
         setResponse(res?.data);
      } catch (err) {
         if (axios.isAxiosError(err)) {
            if (err.response) {
               const errtext = `Response data: ${err.response.data}\n
               Response status: ${err.response.status}\n
               Response headers: ${err.response.headers}`;
               setError(errtext);
            } else if (err.request) {
               setError(`No response received: ${err.request}\n`);
            } else {
               setError(`Error message: ${err.message}`);
            }
         } else {
            console.error('Unexpected error:', err);
         } 
      } finally {
         setLoading(false)
      }
   }, [config])

   useEffect(() => {
      if(config)
         fetchData();

      return () => controller && controller?.abort()
   }, [config, fetchData, controller]);

   return [response, error, loading, fetchData];
}

export default useAxios;