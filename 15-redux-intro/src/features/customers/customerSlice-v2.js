const initialStateCustomer = {
    fullName: "",
    nationalUID: "",
    createdAt: "",
  };
  
  export default function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
      case "customer/createCustomer":
        return {
          ...state,
          fullName: action.payload.fullName,
          nationalUID: action.payload.nationalUID,
          createdAt: action.payload.createdAt,
        };
      case "customer/updateName":
        return {
          ...state,
          fullName: action.payload,
        };
      default:
        return state;
    }
  }
  
  export function createCustomer(fullName, nationalUID) {
    return {
      type: "customer/createCustomer",
      payload: { fullName, nationalUID, createdAt: new Date().toISOString() },
    };
  }
  
  export function updateName(fullName) {
    return {
      type: "customer/updateName",
      payload: fullName,
    };
  }
