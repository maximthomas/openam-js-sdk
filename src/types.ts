interface CallbackOutput {
  name: string;
  value: number | string | string[];
}

interface CallbackInput {
  name: string;
  value: number | string | string[];
}

interface Callback {
  type: 'NameCallback' | 'PasswordCallback' | 'ConfirmationCallback';
  output: CallbackOutput[];
  input: CallbackInput[];
}

interface AuthData {
  authId: string;
  template: string;
  stage: string;
  header: string;
  infoText: string[];
  callbacks: Callback[];
}

interface LoginFormFactory {
  constructLoginForm(authData: AuthData): React.FC
}

export type { AuthData, Callback, CallbackInput, CallbackOutput };