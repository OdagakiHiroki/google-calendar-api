import React from 'react';
import { Navigate } from 'react-router-dom';
declare global {
  interface Window {
    gapi: any;
  }
}

type Props = {
  path: string;
  element: React.ReactElement;
  requiresAuth?: boolean;
};

// TODO: 構造考える
export const BeforeRenderElement: React.VFC<Props> = ({
  path,
  element,
  requiresAuth,
}) => {
  // googleApiのロードがされていなかった場合、ロードする
  if (window.gapi) {
    // 認証が必要ならページなら認証情報をチェック
    const isSignIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
    console.debug('認証情報チェック', isSignIn);
    // 認証済状態でログイン画面に遷移した際はホーム画面へリダイレクト
    if (isSignIn && path === '/login') {
      return <Navigate to="/" replace={true} />;
    }
    if (requiresAuth) {
      // 認証していない場合ログインページへリダイレクト
      if (!isSignIn) {
        console.debug('認証失敗、ログイン画面へリダイレクト');
        return <Navigate to="/login" replace={true} />;
      }
    }
    // 認証している場合はそのまま画面表示
    return element
  }
  return <Navigate to="/" replace={true} />;
};
