const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	label: {type: String, required: true},
	description: {type: String},
	important: {type: Boolean, default: false},
	status: {type: Number},
	add_date: {type: String},
	deadline_date: {type: String},
	execution_time_plan: {type: Number},
	execution_time_fact: {type: Number},
	user_id: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Task', schema);
