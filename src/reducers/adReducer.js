
export function adsReducer(
  state = localStorage.getItem("ads") ? JSON.parse(localStorage.getItem("ads")) : null,
  action
) {
  switch (action.type) {

    case "UPDATE_ADS":
      return action.payload;

    default:
      return state;
  }
}
