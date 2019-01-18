import { Meteor } from 'meteor/meteor';
import Students from '../imports/api/students.js';


function insertLink(firstName, lastName,github) {
    Students.insert({ firstName, lastName, github });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Students.find().count() === 0) {
    insertLink(
      'FirstName',
      'LastName',
      'github',
    );
  }
});
