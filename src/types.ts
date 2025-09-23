interface CallbackOutput {
  name: string;
  value: string;
}

interface CallbackInput {
  name: string;
  value: string;
}

interface Callback {
  type: 'NameCallback' | 'PasswordCallback';
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

export type { AuthData, Callback, CallbackInput, CallbackOutput };