export const CONSTANS = {

}

export const REQUEST_HEADER = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
}

export const LOCAL_STORAGE_KEYS = {
  POST_CREATING: {
    FIRST_STEP: 'first_step_local_local_storage',
    SECOND_STEP: 'second_step_local_local_storage',
    THIRD_STEP: 'third_step_local_local_storage'
  }
}

export const COOKIE_KEYS = {
  SEESION_HASH: 'session_hash_flapper_news',
}

export const API = {
  V1: {
    REGISTRATION_INDEX: '/api/v1/registration',
    NEWS_PAGE_INDEX: '/api/v1/news_page',
    SESSIONS: '/api/v1/sessions',
    VALIDATE_TOKEN: '/api/v1/validate_token',
    UPLOAD_CONTENT_IMAGE: '/api/v1/upload_content_image',
    DELETE_CONTENT_IMAGE: '/api/v1/delete_content_image'
  }
}

export const INITIAL_STATES = {
  POST: {
    FIRST_STEP: {
      title: null,
      subtitle: null,
      categories: null
    },
    SECOND_STEP: {
      source: null,
      overlay: {
        color: '#fff',
        opacity: 0,
        blur: 0,
        gray: 0
      }
    },
    THIRD_STEP: null
  }
}

export const EDITOR_OPTIONS = {
  placeholderText: 'Enter Your Content Here!',
  charCounterCount: false,
  imageUploadURL: API.V1.UPLOAD_CONTENT_IMAGE,
  iframe: false,
  toolbarBottom: ['bold',
                  'italic',
                  'underline',
                  'strikeThrough',
                  'subscript',
                  'superscript',
                  '|',
                  'fontFamily',
                  'fontSize',
                  'color',
                  'inlineStyle',
                  'paragraphStyle',
                  '|',
                  'paragraphFormat',
                  'align',
                  'formatOL',
                  'formatUL',
                  'outdent',
                  'indent',
                  'quote',
                   '-',
                   'insertLink',
                   'insertImage',
                   'insertVideo',
                   '|',
                   'emoticons',
                   'specialCharacters',
                   'insertHR',
                   'selectAll',
                   'clearFormatting',
                   '|',
                   'print',
                   'spellChecker',
                   'help',
                   '|',
                   'undo',
                   'redo'],
   htmlAllowedStyleProps: ['font-family',
                           'font-size',
                           'background',
                           'color',
                           'width',
                           'text-align',
                           'vertical-align',
                           'background-color']
}
