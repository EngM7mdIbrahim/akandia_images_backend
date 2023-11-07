const baseURL = "/api/";
const AUTH_DIR = "auth/";
const ADV_DIR = "advertisers/";
const FILES_DIR = "files/";
const CAMPAIGNS_DIR = "campaigns/";
const ADMINS_DIR = "admins/";
const ROUTES = {
  AUTH: {
    EMAIL_SIGNIN: `${baseURL}${AUTH_DIR}signin/`,
    CURRENT_USER: `${baseURL}${AUTH_DIR}current-user/`,
  },
  ADVERTISERS: {
    CURRENT_USER: `${baseURL}${ADV_DIR}current-user/`,
    SIGN_UP: `${baseURL}${ADV_DIR}signup/`,
  },
  FILES: {
    UPLOAD: `${baseURL}${FILES_DIR}upload/`,
    ISSUE_URL: `${baseURL}${FILES_DIR}issue-url/`,
  },
  CAMPAIGNS: {
    CREATE: `${baseURL}${CAMPAIGNS_DIR}create/`,
    UPDATE: `${baseURL}${CAMPAIGNS_DIR}update/`,
    GET_SINGLE: `${baseURL}${CAMPAIGNS_DIR}:id/`,
  },
  ADMINS: {
    SIGN_UP: `${baseURL}${ADMINS_DIR}signup/`,
    CURRENT_USER: `${baseURL}${ADMINS_DIR}current-user/`,
    GET_ALL_CAMPAIGNS: `${baseURL}${ADMINS_DIR}${CAMPAIGNS_DIR}get-all/`,
    APPROVE_CAMPAIGN: `${baseURL}${ADMINS_DIR}${CAMPAIGNS_DIR}approve/`,
    REJECT_CAMPAIGN: `${baseURL}${ADMINS_DIR}${CAMPAIGNS_DIR}reject/`,
    UPDATE_CAMPAIGN: `${baseURL}${ADMINS_DIR}${CAMPAIGNS_DIR}update/`,
    GET_SINGLE_CAMPAIGN: `${baseURL}${ADMINS_DIR}${CAMPAIGNS_DIR}:id/`,
  },
};

export { ROUTES };
