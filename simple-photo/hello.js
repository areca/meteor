if (Meteor.isClient) {
  Template.body.helpers({
    photo: function () {
      return Session.get("photo");
    },
    loc: function () {
      // return 0, 0 if the location isn't ready
      return Geolocation.latLng() || { lat: 0, lng: 0 };
    },
    error: Geolocation.error
  });

  Template.body.events({
    'click button': function () {
      var cameraOptions = {
        width: 800,
        height: 600
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        if(error) {
          console.log(error);
        } else Session.set("photo", data);
      });
    }
  });
}
