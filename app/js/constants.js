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
})

// Pitch Status Codes
.constant('PITCH_STATUS', {
  0: 'active',
  1: 'completed',
  2: 'cancelled',
  3: 'deleted'
});
