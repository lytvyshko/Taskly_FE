let accessToken: string | null = null;

export const tokenService = {
  getAccessToken: () => accessToken,

  setAccessToken: (token: string) => {
    accessToken = token;
  },

  clear() {
    accessToken = null;
  },
};
