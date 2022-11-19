import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
// import { useEffect, useState } from "react";

// const useDebounce = (value, delay) => {
//   const [debounceVal, setDebounceVal] = useState(value);

//   useEffect(() => {
//     const handle = setTimeout(() => {
//       setDebounceVal(value);
//     }, delay);

//     return () => {
//       clearTimeout(handle);
//     };
//   }, [value]);

//   return debounceVal;
// };

// export default useDebounce;
