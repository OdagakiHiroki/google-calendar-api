import { LoadGapi, GapiInit, CreateReq, ExecReq, ThenReq } from "./types/gapi";

const loadGapi: LoadGapi = () => {
  return new Promise((resolve, reject) => {
    const scriptDom = document.createElement("script");
    scriptDom.id = "gapiScript";
    scriptDom.src = "https://apis.google.com/js/api.js";
    scriptDom.async = true;
    scriptDom.defer = true;
    scriptDom.onload = () => {
      console.debug("gapi.js loaded.");
      resolve("gapi.js loaded");
    };
    scriptDom.onerror = () => {
      console.debug("gapi.js not loaded.");
      reject();
    };
    document.getElementsByTagName("head")[0].appendChild(scriptDom);
  });
};

const gapiInit: GapiInit = (initParams, callback) => {
  const initClient = () => {
    const { apiKey, clientId, discoveryDocs, scope } = initParams;
    window.gapi.client
      .init({
        apiKey,
        clientId,
        discoveryDocs,
        scope,
      })
      .then(() => {
        console.debug("init完了");
        callback();
      });
  };
  (async () => {
    await loadGapi();
    window.gapi.load("client:auth2", initClient);
  })();
};

const createReq: CreateReq = ({ path, method, params, headers, body }) => {
  return window.gapi.client.request({
    path,
    method,
    params,
    headers,
    body,
  });
};

const execReq: ExecReq = (reqObj, isRawRes = false) => {
  const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
  return new Promise((resolve, reject) => {
    if (!isSignedIn) {
      reject("not authorized");
      return;
    }
    reqObj.execute((jsonResp: any, rawResp: any) => {
      if (isRawRes) {
        resolve(rawResp);
        return;
      }
      if (jsonResp) {
        resolve(jsonResp);
        return;
      }
      reject("request failure");
    });
  });
};

const thenReq: ThenReq = (reqObj) => {
  const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
  return new Promise((resolve, reject) => {
    if (!isSignedIn) {
      reject("not authorized");
      return;
    }
    reqObj.then((resp: any) => {
      if (resp) {
        resolve(resp);
        return;
      }
      reject("request failure");
    });
  });
};

export { loadGapi, gapiInit, createReq, execReq, thenReq };
