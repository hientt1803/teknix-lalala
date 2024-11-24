export type User = {
   id?: string;
   first_name?: string;
   last_name?: string;
   password?: string;
   location?: string;
   title?: string;
   description?: string;
   tags?: string;
   avatar?: string;
   tfa_secret?: string;
   status?: string;
   role?: string;
   token?: string;
   last_access?: string;
   last_page?: string;
   provider?: string;
   external_identifier?: string;
   email?: string;
   auth_data?: string;
   email_notifications?: boolean;
   language?: string;
   appearance?: string;
   theme_dark?: string;
   theme_light?: string;
   theme_light_overrides?: string;
   theme_dark_overrides?: string;
};

// REGISTER
export interface IRequestRegister {
   email: string;
   password: string;
}
export interface IResponRegister extends IResponseLogin {}

// LOGIN
export interface RequestLogin {
   email: string;
   password: string;
}
export interface IResponseLogin {
   user?: User;
   access_token: string;
   refresh_token: string;
}

export interface ResponseAuthWithToken extends IResponseLogin {}
