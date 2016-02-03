trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, '');
};

if (Meteor.isClient) {

  Session.set('joke', 'Result comes here');

  Template.hello.helpers({
    joke: function () {
      return Session.get("joke");
    }
  });

  Template.hello.events({
    'submit #my-form': function (e, target) {
      e.preventDefault();

      var name =  trimInput($(e.currentTarget).find('#name').val()),
          surname =  trimInput($(e.currentTarget).find('#surname').val());

      console.log('Name: ' + name + ' Surname: ' + surname);

      var params = {
        name: name,
        surname: surname
      };
      // increment the counter when button is clicked
      Meteor.call("checkTwitter", params,  function(error, results) {
        if(error) console.warn('ERROR: ' , error);
        else {
          console.log(results.content);
          Session.set('joke', trimInput(results.content));
        }
      });
    }
  });
}

if (Meteor.isServer) {

  Meteor.methods({
    checkTwitter: function (params) {
      this.unblock();
      return Meteor.http.call("GET", "http://api.icndb.com/jokes/random?firstName=" + params.name + "&amp;lastName=" + params.surname);
    }
  });



  Meteor.startup(function () {
    // code to run on server at startup
  });
}
