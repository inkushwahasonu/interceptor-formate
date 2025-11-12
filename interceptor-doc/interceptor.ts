// src/services/interceptor.ts
// import { SERVER_URL } from "./config";

const SERVER_URL = 'Your-server-url';

const { fetch: originalFetch } = window;

window.fetch = async function (...args) {
  const url = args[0] as string;
  const config: RequestInit = (args[1] || {}) as RequestInit;

  /** Default headers (can be extended easily) */
 const defaultHeaders: HeadersInit = {
/** Basic content negotiation */
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",

/** Cache and freshness */
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: "0", /** prevents old caches from serving stale responses */ 

  /** Localization & versioning */
  "Accept-Language": localStorage.getItem("lang") || navigator.language || "en-US",
  "X-App-Version": "1.0.0", /**  or dynamically from package.json */
  "X-Platform": "web", /**  could be 'web', 'mobile', etc. */

 /**  Device and client info */
  "X-Device-Id": localStorage.getItem("deviceId") || "browser",
  "X-Client-Name": "MyReactApp",
  "X-Client-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  "X-Client-Date": new Date().toISOString(),

  /**  Security / Traceability */
  "X-Request-Id": crypto.randomUUID(), /**  helps correlate logs on server  */
  "X-Origin": window.location.origin,  /**  which domain sent the request */
};



  config.headers = {
    ...defaultHeaders,
    ...(config.headers || {}),
  };


  const token = localStorage.getItem("authToken");
  if (token && url.includes(SERVER_URL)) {
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  /**  Make the network request */
  const resp = await originalFetch(url, config);

  /**  Global 401 (unauthorized) handler */
  if (resp.status === 401) {
    alert("Your session / JWT has expired. Please log in again.");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return resp;
};


/** 
 * todo: import ir in main.tsx and setup automatically
  import "./services/interceptor";
 */




/**
 * Todo: learn about
 */


// interface RequestInit {
//     /** A BodyInit object or null to set request's body. */
//     body?: BodyInit | null;
//     /** A string indicating how the request will interact with the browser's cache to set request's cache. */
//     cache?: RequestCache;
//     /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
//     credentials?: RequestCredentials;
//     /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
//     headers?: HeadersInit;
//     /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
//     integrity?: string;
//     /** A boolean to set request's keepalive. */
//     keepalive?: boolean;
//     /** A string to set request's method. */
//     method?: string;
//     /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
//     mode?: RequestMode;
//     priority?: RequestPriority;
//     /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
//     redirect?: RequestRedirect;
//     /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
//     referrer?: string;
//     /** A referrer policy to set request's referrerPolicy. */
//     referrerPolicy?: ReferrerPolicy;
//     /** An AbortSignal to set request's signal. */
//     signal?: AbortSignal | null;
//     /** Can only be null. Used to disassociate request from any Window. */
//     window?: null;
// }