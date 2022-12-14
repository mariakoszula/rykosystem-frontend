import {AdditionRecordsResponse, Record} from "../record.model";
import {FETCH, RecordActions, SET_RECORDS, ADD_RECORDS} from "./record.action";

export interface State {
  records: Record[];
  recordsFailedResponse: AdditionRecordsResponse | null;
  isLoading: boolean
}

const initialState = {
  records: [],
  recordsFailedResponse: null,
  isLoading: false
}

export function recordReducer(state: State = initialState, action: RecordActions) {
  switch(action.type) {
    case FETCH:
      return {
        ...state,
        records: [],
        recordsFailedResponse: null,
        isLoading: true
      }
    case ADD_RECORDS:
      return {
        ...state,
        isLoading: true
      }
    case SET_RECORDS:
      let failed = action.payload.recordsFailedResponse;
      let updateFailed: AdditionRecordsResponse | null = null;
      if (failed){
        updateFailed = {
          date: failed.date,
          records: [...failed.records]
        }
      }
      return {
        ...state,
        records: [...state.records, ...action.payload.records],
        recordsFailedResponse: updateFailed,
        isLoading: false
      }
    default:
      return state;
  }
}
