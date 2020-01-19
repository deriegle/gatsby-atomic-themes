import React from 'react';
import AuthWrapper from './src/components/auth-wrapper';

/*
 *  oktaBaseUrl: String [default: process.env.OKTA_BASE_URL]
 *  logo: String [default: process.env.OKTA_LOGO]
 *  clientId: String [default: process.env.OKTA_CLIENT_ID]
 *  redirectUri: String
 *  allowRegistration: Boolean [default: false]
 *  oktaElementId: Boolean [default: '#okta']
 *  rememberMe: Boolean [default: true]
 *  selfServiceUnlock: Boolean [default: false]
 */

export const wrapRootElement = ({ element }, pluginOptions = {}) => {
  const {
    oktaBaseUrl,
    logo,
    clientId,
    redirectUri,
    allowRegistration,
    oktaElementId,
    rememberMe,
    selfServiceUnlock
  } = pluginOptions;

  return (
    <AuthWrapper
      allowRegistration={!!pluginOptions.allowRegistration}
      logo={logo}
      clientId={clientId}
      redirectUri={redirectUri}
      allowRegistration={allowRegistration}
      oktaElementId={oktaElementId}
      rememberMe={rememberMe}
      selfServiceUnlock={selfServiceUnlock}
    >
      {element}
    </AuthWrapper>
  );
};
