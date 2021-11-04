import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SESSION_TOKEN } from '../utils/constants';

function SecuredRoute({ children, ...rest }) {
   
    function isSessionValid() {

        const sessionKey = sessionStorage.getItem(SESSION_TOKEN);
        
        if ( sessionKey ) {
            const parts = sessionKey.split(':');

            const currentTime = new Date().getTime();
            const expireTime = Number(parts[1]);
            
            return expireTime >= currentTime;
        }

        return false;
    }
    
    return (
      <Route {...rest}
        render={({ location }) =>
            isSessionValid() ? (children) 
            : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default SecuredRoute;