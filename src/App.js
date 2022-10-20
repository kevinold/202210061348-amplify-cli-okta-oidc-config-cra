import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from "aws-amplify";
import React from "react";
import "./App.css";
import TodoList from './TodoList';

function SignInWithOkta() {
  return (<button onClick={() => Auth.federatedSignIn({ customProvider: "Okta" })}>
    Sign via Okta
  </button>)
}

function App() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

 return (
    <>
      {(authStatus === 'configuring' || authStatus === 'unauthenticated') && <SignInWithOkta/>}
      {authStatus === 'authenticated' && <TodoList />}
    </>
  );

}

export default App;