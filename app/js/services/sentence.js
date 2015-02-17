angular.module('app')

.factory('SentenceService', function($filter) {
  var sentences = [
    { text: 'Keeping it real since \'[x]', date: 'yy' },
    { text: 'The real O.G. since \'[x]', date: 'yy' },
    { text: 'My power level is over [x]', date: 'yyyy' },
    { text: '[x]. That is all.', date: 'yyyy' }
  ];

  return {
    getRandom: function(date) {
      var index = Math.floor(Math.random() * sentences.length);
      var sentence = sentences[index];
      return sentence.text.replace('[x]', $filter('date')(date, sentence.date));
    }
  };
});