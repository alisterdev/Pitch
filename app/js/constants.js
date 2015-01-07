angular.module('app')

.constant('SERVER', {
  url: '/server'
})

.constant('API', {
  url: '/api/v1'
})

// Database Error Codes
.constant('DEC', {
  accessToken: {
    requireUserID: 'accessToken.requireUserID'
  },
  user: {
    none: 'user.none'
  }
});