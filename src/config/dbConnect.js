const moongose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await moongose.connect(process.env.CONNECTION_STRING);
    console.log(
      `Connected to database: ${connect.connection.host},${connect.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnect;
