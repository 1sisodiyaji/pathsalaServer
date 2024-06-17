const mongoose = require("mongoose");
require("dotenv").config();


exports.connect = () => {
	mongoose
		.connect(process.env.MONGODB_URL)
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
