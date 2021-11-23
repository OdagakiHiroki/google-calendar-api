/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    gapi: any;
  }
}

export type LoadGapi = () => Promise<unknown>;
export type GapiInit = (
  initParams: {
    apiKey?: string,
    clientId?: string,
    discoveryDocs: string[],
    scope: string,
  },
  callback: () => void
) => void;
export type CreateReq = ({
  path,
  method,
  params,
  headers,
  body,
}: gapi.client.RequestOptions) => gapi.client.HttpRequest<any>;
export type ExecReq = (reqObj: any, isRawRes?: boolean) => Promise<any>;
export type ThenReq = (reqObj: any) => Promise<any>;
