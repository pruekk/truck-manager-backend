const ResponseStatus = {
  ACCOUNT_LOGIN_SUCCESS: {
    status_code: 1,
    message: "Login Success.",
  },
  ACCOUNT_LOGIN_FAILED: {
    status_code: 2,
    message: "Login Failed. Token Invalid!",
  },
  ACCOUNT_NOT_ACTIVED: {
    status_code: 3,
    message: "Your account is not actived. Please contact admin!",
  },
  ACCOUNT_CREATED: {
    status_code: 4,
    message:
      "Your account created. Please wait for an admin to active account.",
  },
  ACTION_NOT_ALLOW: {
    status_code: 5,
    message: "You are not allowed to do that!",
  },
  CREATE_SUCCESS: {
    status_code: 6,
    message: "Data created successful.",
  },
  UPDATE_SUCCESS: {
    status_code: 7,
    message: "Data has been updated.",
  },
  DELETE_SUCCESS: {
    status_code: 8,
    message: "Data has been deleted.",
  },
  GET_SUCCESS: {
    status_code: 9,
    message: "Get data successful.",
  },
  GET_ALL_SUCCESS: {
    status_code: 10,
    message: "Get all data successful.",
  },
  REQUEST_OUT_OF_LENGTH: {
    status_code: 11,
    message: "You are request data exceed period.",
  },
  SERVER_ERROR: {
    status_code: 12,
    message: "Server Down. Please contact admin!",
  },
  MONGO_CONNECTION_SUCCESS: {
    status_code: 13,
    message: "Connect to Databse successfully.",
  },
  MONGO_CONNECTION_FAILED: {
    status_code: 14,
    message: "Can't connect to Database. Please contact admin!",
  },
  USER_NOT_FOUND: {
    status_code: 15,
    message: "Can't find user.",
  },
  USER_NOT_LOGIN: {
    status_code: 16,
    message: "You are not authenticated!",
  },
  ACCOUNT_LOGIN_TIMEOUT: {
    status_code: 17,
    message: "The login session has timed out. Please log in again.",
  },
};

module.exports = ResponseStatus;
