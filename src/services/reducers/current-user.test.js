import * as types from "../constants/current-user";
import { currentUserReducer, initialState } from "./current-user";


describe("currentUserReducer", () => {

  it("should return the initial state", () => {
    expect(currentUserReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SENT_RESET_EMAIL", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.SENT_RESET_EMAIL,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          resetEmailRequest: true,
          resetEmailFailed: false,
          resetPasswordFailed: false
        }
      })
    );
  });

  it("should handle SENT_RESET_EMAIL_SUCCES", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.SENT_RESET_EMAIL_SUCCES,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          resetEmailRequest: false,
          resetEmailFailed: false,
          resetEmailSucces: true,
        }
      })
    );
  });

  it("should handle SENT_RESET_EMAIL_FAILED", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.SENT_RESET_EMAIL_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          resetEmailRequest: false,
          resetEmailFailed: true,
        }
      })
    );
  });

  it("should handle SENT_RESET_PASSWORD", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.SENT_RESET_PASSWORD,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          resetPasswordRequest: true,
          resetPasswordFailed: false,
          resetEmailSucces: false,
        }
      })
    );
  });

  it("should handle SENT_RESET_PASSWORD_SUCCES", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.SENT_RESET_PASSWORD_SUCCES,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          resetPasswordRequest: false,
          resetPasswordFailed: false,
        }
      })
    );
  });

  it("should handle SENT_RESET_PASSWORD_FAILED", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.SENT_RESET_PASSWORD_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          resetPasswordRequest: false,
          resetPasswordFailed: true,
        }
      })
    );
  });

  it("should handle SIGNIN", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.SIGNIN,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          signInRequest: true,
          signInFailed: false,
        }
      })
    );
  });


  it("should handle SIGNIN_SUCCES", () => {
    const user = { name: 'user', email: 'mail@mail.ru' }
    expect(
      currentUserReducer(initialState, {
        type: types.SIGNIN_SUCCES,
        user,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          signInRequest: false,
          signInFailed: false,
          name: user.name,
          email: user.email,
        }
      })
    );
  });

  it("should handle SIGNIN_FAILED", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.SIGNIN_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          signInRequest: false,
          signInFailed: true,
        }
      })
    );
  });

  it("should handle REGISTER", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.REGISTER,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          registerRequest: true,
          registerFailed: false,
        }
      })
    );
  });

  it("should handle REGISTER_SUCCES", () => {
    const user = { name: 'user', email: 'mail@mail.ru' }
    expect(
      currentUserReducer(initialState, {
        type: types.REGISTER_SUCCES,
        user,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          signInRequest: false,
          signInFailed: false,
          name: user.name,
          email: user.email,
        }
      })
    );
  });


  it("should handle REGISTER_FAILED", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.REGISTER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          registerRequest: false,
          registerFailed: true,
        }
      })
    );
  });

  it("should handle GET_USER_REQUEST", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.GET_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          getUserRequest: true,
          getUserFailed: false,
        }
      })
    );
  });

  it("should handle GET_USER_SUCCES", () => {
    const user = { name: 'user', email: 'mail@mail.ru' }
    expect(
      currentUserReducer(initialState, {
        type: types.GET_USER_SUCCES,
        user,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          getUserRequest: false,
          getUserFailed: false,
          name: user.name,
          email: user.email,
        }
      })
    );
  });

  it("should handle GET_USER_FAILED", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.GET_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          getUserRequest: false,
          getUserFailed: true,
        }
      })
    );
  });

  it("should handle UPDATE_USER_REQUEST", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.UPDATE_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          updateUserRequest: true,
          updateUserFailed: false,
        }
      })
    );
  });

  it("should handle UPDATE_USER_SUCCES", () => {
    const user = { name: 'user', email: 'mail@mail.ru' }
    expect(
      currentUserReducer(initialState, {
        type: types.UPDATE_USER_SUCCES,
        user,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          updateUserRequest: false,
          updateUserFailed: false,
          name: user.name,
          email: user.email,
        }
      })
    );
  });

  it("should handle UPDATE_USER_FAILED", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.UPDATE_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          updateUserRequest: false,
          updateUserFailed: true,
        }
      })
    );
  });

  it("should handle EXIT_REQUEST", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.EXIT_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          exitRequest: true,
          exitFailed: false,
        }
      })
    );
  });

  it("should handle EXIT_SUCCES", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.EXIT_SUCCES,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          resetEmailRequest: false,
          resetEmailFailed: false,
          resetPasswordRequest: false,
          resetPasswordFailed: false,
          resetEmailSucces: false,
          signInRequest: false,
          signInFailed: false,
          registerRequest: false,
          registerFailed: false,
          getUserRequest: false,
          getUserFailed: false,
          exitRequest: false,
          exitFailed: false,
          name: '',
          email: '',
        }
      })
    );
  });

  it("should handle EXIT_FAILED", () => {

    expect(
      currentUserReducer(initialState, {
        type: types.EXIT_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentUser: {
          ...initialState.currentUser,
          exitRequest: false,
          exitFailed: true,
        }
      })
    );
  });

});


