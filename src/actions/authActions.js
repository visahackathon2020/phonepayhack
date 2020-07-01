import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_SKIN,
} from "./types";

import { push } from "connected-react-router";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  if (!getState().auth.accessToken || !getState().auth.clientToken) {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch(push("/"));
    return;
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  authenticate(email, password)
    .then(async (res) => {
      dispatch({
        type: UPDATE_SKIN,
        payload: await getPlayerSkin(res.data.selectedProfile.id),
      });
      dispatch(push("/home"));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => (dispatch, getState) => {
  signout(getState().auth.accessToken, getState().auth.clientToken).then(
    (res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      dispatch(push("/"));
    }
  );
};
