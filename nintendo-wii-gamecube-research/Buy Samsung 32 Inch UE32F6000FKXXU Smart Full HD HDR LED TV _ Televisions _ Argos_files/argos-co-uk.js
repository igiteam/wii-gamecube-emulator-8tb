/*
 **************
 * ARGOS SHOPPING ONLINE CLIENT
 **************
 */

(() => {
  const FC_CONF = {
    API_HOST: 'https://fc.argos.co.uk/op',
    API_INFO_URL: '/argos-web-info/info',
    STORAGE_KEY: 'fcData',
    STORAGE_TYPE: 'localStorage',
    IDCONNECT_API_HOST: 'https://fc.argos.co.uk/op/idconnect',
    IDCONNECT_MANUAL_ROUTING: true,
    IDCONNECT_NEXT_BEST_DOMAIN: 'fc.nectar.com',
    IDCONNECT_DATA_STORAGE: 'fcIdConnectData',
    IDCONNECT_STORAGE_TYPE: 'localStorage',
    IDCONNECT_TYPE: 'crossdomain',
    IDCONNECT_ALLOWED_USE_CASES: [],
    IDCONNECT_ALLOW_TOKEN_DATA_CALL: false,
    IDCONNECT_ALLOW_TOKEN_DATA_CALL_COUNTER: 1,
    META_TAGS: [],
    FLOODLIGHT_ID: 'nectarFloodlight',
    API_FLOODLIGHT_PATH: [
      '/argos-web-fls/track',
      '/argos-web-fls-essence/track',
    ],
    API_FACEBOOK_URL: '/argos-fb/track',
    FACEBOOK_IFRAME_ID: 'nectarFacebook',
    FACEBOOK_ID: '424412008109699',
    IDR_QUERY_PARAMETERS: ['e10'],
    ROOT_VARIABLE: ['utag:data', 'digitalData', 'utag_data'],
    VARIABLES_DELIMITER: ':',
    SITE_VARIABLES: [
      'pageName',
      'onsiteSearchTerms',
      'profileID',
      'total',
      'qp.utm_source',
      'qp.utm_medium',
      'qp.utm_campaign',
      'qp.istItemId',
      'qp.gclid',
      'currentTrackValue',
      'cp.prev_vals'
    ],
  };

  const CONSTANTS = {
    CLIENT_HASH_ID_NAME: 'profile_id',
    TESTING_ITEM_NAME: 'FC_TESTING_MODE',
    SESSION_CALL_NAME: 'FC_SESSION_CALL',
    LOCAL_TIME_INTERVAL: 'FC_LOCAL_TIME_INTERVAL',
    TEST_URL_PARAM: 'test-env',
  };

  const findArgosId = () =>
      window?.digitalData?.user?.[0]?.profile?.[0]?.profileInfo?.profileID;

  const CALLS_CONFIG = {
    conditions: {
      timeConditions: {
        oncePerSession: true,
        oncePerTimeInterval: null,
      },
      oncePerPage: true,
      urls: null,
    },
    callsToMake: {
      info: {
        ident: [
          {
            customerId: findArgosId(),
            customerKey: 'fc_pid',
          },
        ],
        cookieParams: [
            {
                cookie_name: 'OptanonConsent',
                cookie_param: 'groups',
            },
        ],
        track: true,
      },
      idConnect: false,
      idConnectInfo: false,
      floodlight: true,
      facebook: false,
      idsync: false,
    },
    callsPerPage: {
      info: true,
      idConnect: false,
      idConnectInfo: false,
      floodlight: false,
      facebook: false,
      idsync: false,
    },
  };

  window.Teavaro ||= {};
  window.Teavaro.data ||= {};
  window.Teavaro.data.clientConfig = {
    CONSTANTS,
    CALLS_CONFIG,
    FC_CONF,
  };
})();
