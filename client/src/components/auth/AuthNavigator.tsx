
import { useState } from 'react';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import RegisterSuccessScreen from './RegisterSuccessScreen';
import EmailSentScreen from './EmailSentScreen';

type Screen =
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'registerSuccess'
  | 'emailSent';

export default function AuthNavigator() {
  const [screen, setScreen] = useState<Screen>('login');
  const [email, setEmail] = useState('');

  switch (screen) {
    case 'register':
      return (
        <RegisterScreen
          onLogin={() => setScreen('login')}
          onSuccess={() => setScreen('registerSuccess')}
        />
      );

    case 'forgotPassword':
      return (
        <ForgotPasswordScreen
          onLogin={() => setScreen('login')}
          onSuccess={(value) => {
            setEmail(value);
            setScreen('emailSent');
          }}
        />
      );

    case 'registerSuccess':
      return (
        <RegisterSuccessScreen
          onLogin={() => setScreen('login')}
        />
      );

    case 'emailSent':
      return (
        <EmailSentScreen
          email={email}
          onLogin={() => setScreen('login')}
          onBack={() => setScreen('forgotPassword')}
        />
      );

    default:
      return (
        <LoginScreen
          onRegister={() => setScreen('register')}
          onForgotPassword={() => setScreen('forgotPassword')}
        />
      );
  }
}
