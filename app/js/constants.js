angular.module('app')

// Database Error Codes
.constant('DEC', {
  accessToken: {
    requireUserID: 'accessToken.requireUserID'
  },
  user: {
    none: 'user.none'
  },
  unauthorized: 'user.unauthorized'
});
