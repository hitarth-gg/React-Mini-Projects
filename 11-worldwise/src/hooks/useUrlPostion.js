import { useSearchParams } from "react-router-dom";

// whenever we need position from the url we call this function 
// this is a custom hook btw :>
export function useUrlPosition() { 
    const [searchParams, setSearchParams] = useSearchParams(); // here searchParams is used to read the search parameters from the url and setSearchParams is used to set / update the searchParams
    // URL Right now : http://localhost:5173/app/cities/73930385?lat=38.727881642324164&lng=-9.140900099907554
  
    //  let us now store the search parameters in a variable since searchParams is not a normal object and we cannot use it to store the values, instead it's an object on which we have to use "get" methods to get the values
  
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return [lat, lng];
}
