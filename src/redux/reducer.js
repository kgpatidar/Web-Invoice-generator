import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoice-slice";

const rootReducer = combineReducers({
  invoices: invoicesReducer,
});

export default rootReducer;
