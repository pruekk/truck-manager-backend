const ResponseStatus = {
  ACCOUNT_LOGIN_SUCCESS: "Login Success.",
  ACCOUNT_LOGIN_FAILED: "Login Failed. Token Invalid!",
  ACCOUNT_NOT_ACTIVED: "Your account is not actived. Please contact admin!",
  ACCOUNT_CREATED:
    "Your account created. Please wait for an admin to active account.",
  ACTION_NOT_ALLOW: "You are not allowed to do that!",
  CREATE_SUCCESS: "Data created successful.",
  UPDATE_SUCCESS: "Data has been updated.",
  DELETE_SUCCESS: "Data has been deleted.",
  GET_SUCCESS: "Get data successful.",
  GET_ALL_SUCCESS: "Get all data successful.",
  REQUEST_OUT_OF_LENGTH: "You are request data exceed period.",
  SERVER_ERROR: "Server Down. Please contact admin!",
  MONGO_CONNECTION_SUCCESS: "Connect to Databse successfully.",
  MONGO_CONNECTION_FAILED: "Can't connect to Database. Please contact admin!",
  USER_NOT_FOUND: "Can't find user:",
  USER_NOT_LOGIN: "You are not authenticated!",
  ACCOUNT_LOGIN_TIMEOUT:
    "The login session has timed out. Please log in again.",
};

module.exports = ResponseStatus;
