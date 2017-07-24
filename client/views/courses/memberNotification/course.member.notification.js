Template.courseMemberNotification.onCreated(function() {

});

Template.courseMemberNotification.helpers({


});

const memberIdsWithoutCurrentUser = ({course, currentUserId}) => (
  course.members.map(
    (member) => member.user
  ).filter(
    (member) => member !== currentUserId
  )
);

Template.courseMemberNotification.events({
  'click .js-member-notification-send': function(event, {data: {course}}) {
    course = course.course;
    const currentUserId = Meteor.userId();
    const memberIds = memberIdsWithoutCurrentUser({course, currentUserId});
    Meteor.call('sendMessageToAllMembers', {
      members: memberIds,
      senderUserId: Meteor.userId(),
      subject: 'a subject',
      body: 'a body'
    }, (error, courseId) => {
      console.log(error, courseId);
    });
  }
});
