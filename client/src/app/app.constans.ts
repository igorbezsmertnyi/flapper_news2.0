export const CONSTANS = {

}

export const REQUEST_HEADER = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
}

export const COOKIE_KEYS = {
  SEESION_HASH: 'session_hash',
}

export const API = {
  V1: {
    REGISTRATION_INDEX: '/api/v1/registration',
    NEWS_PAGE_INDEX: '/api/v1/news_page',
    SESSIONS: '/api/v1/sessions',
    VALIDATE_TOKEN: '/api/v1/validate_token'
  }
}
