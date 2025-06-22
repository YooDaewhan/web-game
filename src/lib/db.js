import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "ec2-13-125-238-80.ap-northeast-2.compute.amazonaws.com",
  user: "ydh960823",
  password: "Adbtmddyd2!",
  database: "chat-api",
});

export default pool;
