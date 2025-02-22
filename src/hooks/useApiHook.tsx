import {useReducer, useEffect, useRef, useState} from 'react';
import {ToastAndroid} from 'react-native';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';
const LOAD_MORE = 'LOAD_MORE';
const ALTER_DATA = 'ALTER_DATA';
const REFETCH = 'REFETCH';


// Define types for the state and actions
type State = {
  data:  object;
  loading: boolean;
  error: string | null;
  refetching: boolean;
};

type Action = 
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ALTER_DATA'; payload: any }
  | { type: 'REFETCH'; payload: any }


// Reducer function
const dataFetchReducer = (state:State, action:Action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {...state, loading: true, error: null};
    // case LOAD_MORE:
    //   return {...state, loadingMore: true, error: null};
    case REFETCH:
      return {...state, refetching: true, error: null};
    case FETCH_SUCCESS:
      return {...state, loading: false,loadingMore:false,refetching:false, data: action.payload};
    case FETCH_ERROR:
      return {...state, loading: false,loadingMore:false,refetching:false, error: action.payload};


    case ALTER_DATA:
      return {...state, loading: false,loadingMore:false,refetching:false, error: action.payload};


    default:
      throw new Error('Unhandled action type');
  }
};

// *******************************************************************************
// ***Do Not Use this hook if you don't need data and loading states in return ***
// *******************************************************************************


// *******************apiParameters should be in a array******************
//********************if runOnTimeOfScreenMount is true then api will first call on the time screen mount time*************

type UseApiProps = {
  apiCallingFunction: (...params: any[]) => Promise<any>;
  apiParameters: any[];
  apiCustomReturnFunction?: (data: any) => any;
  onError?: (data: any) => any;
  runOnTimeOfScreenMount?: boolean;
  initialLoadingState?: boolean;
  initialData?: any;
  reFetchDependencies?: any[];
};

const useApiHook = ({
  apiCallingFunction,
  apiParameters,
  apiCustomReturnFunction,
  onError,
  runOnTimeOfScreenMount,
  initialLoadingState,
  initialData=null,
  reFetchDependencies=[]
}:UseApiProps) => {
  const initialState = {
    data: initialData,
    loading: !!initialLoadingState,
    error: null,
    // loadingMore:false,
    refetching:false
  };

  const [loading, setLoading] = useState(!!initialLoadingState)

  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  // const reduxDispatch = useDispatch();

  const prevDependenciesRef = useRef(reFetchDependencies);

  const alterData=(data:any)=>{
    dispatch({type: ALTER_DATA, payload: data});

  }


  const fetchData = async (showLoader=true, params?:any[], customReturnFunc?: (data: any) => any) => {
    const parameters = params || apiParameters;
    const customReturnFunction = customReturnFunc || apiCustomReturnFunction;
    // console.log(
    //   'fetching data....',
    //   showLoader,
    //   parameters,
    //   customReturnFunction,
    // );
    if (showLoader) {
      // dispatch({type: FETCH_INIT});
      setLoading(true)
    }

    try {
      const apiParams = parameters || [];
      // console.log(
      //   'fetching data....',
      //   showLoader,
      //   parameters,
      //   customReturnFunction,
      //   apiCallingFunction,
      // );

      const response = await apiCallingFunction(...apiParams);
      // console.log('response data..', response);
      if (response.statusCode == 200 || response.statusCode == 201) {
        if (customReturnFunction) {
          const data = customReturnFunction(response);
          dispatch({type: FETCH_SUCCESS, payload: data});
          setLoading(false)
        } else {
          const data = response;
          dispatch({type: FETCH_SUCCESS, payload: data});
          setLoading(false)

        }
      } else if (response.statusCode >= 400) {
        if(onError){

          onError(response);
        }
        if (response?.data?.msg) {
          ToastAndroid.show(response?.data?.msg, ToastAndroid.LONG);
        }
     if(response?.data?.description)   ToastAndroid.show(response?.data?.description, ToastAndroid.LONG);
        dispatch({
          type: FETCH_ERROR,
          payload: response?.data?.msg || 'Something went wrong',
        });
        setLoading(false)

      }
    } catch (error:any) {
      ToastAndroid.show(error?.message || 'Something went wrong', ToastAndroid.LONG);
      console.log('error...........'+error);
      setLoading(false)

      dispatch({
        type: FETCH_ERROR,
        payload: error?.message || 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    if (runOnTimeOfScreenMount) {
      fetchData();
    }

    const areDependenciesDifferent = JSON.stringify(reFetchDependencies) !== JSON.stringify(prevDependenciesRef.current);

    if (areDependenciesDifferent) {
      // dispatch({type: FETCH_INIT});
      setLoading(true)


      // Trigger fetchData if dependencies have changed
      fetchData();
    }

    // Update the previous dependencies ref
    prevDependenciesRef.current = reFetchDependencies;
  }, [...reFetchDependencies]);

  return {...state, fetchData,alterData,loading};
};

// export default useApiHook;