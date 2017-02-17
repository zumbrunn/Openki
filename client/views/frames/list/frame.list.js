Router.map(function () {
	this.route('frameList', {
		path: '/frame/list',
		template: 'frameList',
		layoutTemplate: 'frameLayout',
		waitOn: function () {
			var filter = Filtering(EventPredicates).read(this.params.query).done();

			this.coursesWithEvents = filter.toParams();
			this.coursesWithEvents.upcomingEvent = true;

			this.coursesWithoutEvents = filter.toParams();
			this.coursesWithoutEvents.upcomingEvent = false;

			return [
				Meteor.subscribe('coursesFind', this.coursesWithEvents, 25),
				Meteor.subscribe('coursesFind', this.coursesWithoutEvents, 25),
				Meteor.subscribe('group', this.coursesWithEvents.group)
			];
		},

		data: function() {
			var data = {
				group: Groups.findOne(this.coursesWithEvents.group),
				coursesWithEvents: coursesFind(this.coursesWithEvents, 25),
				coursesWithoutEvents: coursesFind(this.coursesWithoutEvents, 25)
			};
			return data;
		},

		onAfterAction: function() {
			document.title = webpagename + ' Courses';
		}
	});
});

Template.frameList.events({
	'click .js-toggle-event-details': function(e, instance) {
		var jQueryTarget = $(e.currentTarget);

		jQueryTarget.toggleClass('active');
		jQueryTarget.nextAll('.list-style-item-body').toggle();
	}
});