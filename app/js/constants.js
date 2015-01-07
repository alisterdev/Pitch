angular.module('app')

.constant('SERVER', {
  url: 'http://2fc82fb2.ngrok.com'
})

.constant('API', {
  url: 'http://2fc82fb2.ngrok.com/api/v1'
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