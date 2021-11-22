export const getIsSignedIn = async () => {
  return await window.gapi.auth2.getAuthInstance().isSignedIn.get();
};

export const signIn = async () => {
  const signInRes = await window.gapi.auth2.getAuthInstance().signIn();
  if (signInRes["error"]) {
    return {
      isSuccess: false,
    };
  }
  return {
    isSuccess: true,
  };
};

export const signOut = async () => {
  await window.gapi.auth2.getAuthInstance().signOut();
  return {
    isSuccess: true,
  };
};