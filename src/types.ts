export interface CallbackOutput {
  name: string;
  value: number | string | string[];
}

export interface CallbackInput {
  name: string;
  value: number | string | string[];
}

export interface Callback {
  type: 'NameCallback' | 'PasswordCallback' | 'ConfirmationCallback';
  output: CallbackOutput[];
  input: CallbackInput[];
}

export interface AuthData {
  authId: string;
  template: string;
  stage: string;
  header: string;
  infoText: string[];
  callbacks: Callback[];
}

export interface SuccessfulAuth {
  tokenId: string;
  successUrl: string;
  realm: string;
}

export interface AuthError {
  code: number
  reason: string;
  message: string;
}

export type AuthResponse = AuthData | SuccessfulAuth | AuthError;
