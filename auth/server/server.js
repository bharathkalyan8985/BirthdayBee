const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/birthdayApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const birthdaySchema = new mongoose.Schema({
  _id: String,
  data: [
    {
      name: String,
      bdayMsg: String,
      phNo: String,
      date: String,
    },
  ],
});

const Birthday = mongoose.model("Birthday", birthdaySchema);


app.get("/", (req, res) => {
  res.send("Hello, this is the server!");
});

app.post("/api/addBirthday", async (req, res) => {
  try {
    const { name, bdayMsg, phNo, date } = req.body;
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const customId = `${month}${day}`;

    let existingBirthday = await Birthday.findOne({ _id: customId });

    if (existingBirthday) {
      existingBirthday.data.push({ name, bdayMsg, phNo, date });
      await existingBirthday.save();
    } else {
      const birthday = new Birthday({
        _id: customId,
        data: [{ name, bdayMsg, phNo, date }],
      });
      await birthday.save();
    }

    res.status(200).json({ message: "Birthday data added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const port2 = 3001; 
const birthdayCards = [
  {
    id: 1,
    imageUrl: "https://th.bing.com/th/id/OIG2.xg4yznvXuykFcPqbab7H?pid=ImgGn",
  },
  {
    id: 2,
    imageUrl: "https://th.bing.com/th/id/OIG2.1OgxfvoxP.skVLiVD_ie?pid=ImgGn",
  },
  {
    id: 3,
    imageUrl: "https://th.bing.com/th/id/OIG2.NzQkLaS9fr1Rb2FU__ZM?pid=ImgGn",
  },
  {
    id: 4,
    imageUrl: "https://th.bing.com/th/id/OIG3.vgefj3pcHS0gOvvGjqem?pid=ImgGn",
  },
  {
    id: 5,
    imageUrl: "https://th.bing.com/th/id/OIG3.ZVCvpJZn6JvtOBwnjpI8?pid=ImgGn",
  },
  {
    id: 6,
    imageUrl: "https://th.bing.com/th/id/OIG1.Vve9vuZbi4QGk38R_bm_?pid=ImgGn",
  },
  {
    id: 7,
    imageUrl: "https://th.bing.com/th/id/OIG2.YbCM4FBT9SVLEqGBYB2s?pid=ImgGn",
  },
  {
    id: 8,
    imageUrl: "https://th.bing.com/th/id/OIG1.b5eJmAJjSi6tU2DJj6gx?pid=ImgGn",
  },
  {
    id: 9,
    imageUrl: "https://th.bing.com/th/id/OIG3.N_mPKYzTsPq8yYUD6l8a?pid=ImgGn",
  },
  {
    id: 10,
    imageUrl: "https://th.bing.com/th/id/OIG1.Vb4dZZuhg2yHY2lKcnE8?pid=ImgGn",
  },
  {
    id: 11,
    imageUrl: "https://th.bing.com/th/id/OIG1.kbujZpvwfNXoU_QZFzah?pid=ImgGn",
  },
  {
    id: 12,
    imageUrl: "https://th.bing.com/th/id/OIG1.EeKqDBc.4ZnLwHoGVr1H?pid=ImgGn",
  },
  {
    id: 13,
    imageUrl: "https://th.bing.com/th/id/OIG1.QN9n2RYpxVJre_30HNDq?pid=ImgGn",
  },
  {
    id: 14,
    imageUrl: "https://th.bing.com/th/id/OIG2.bZg.Bpq1FVNPIcspI1Mv?pid=ImgGn",
  },
  {
    id: 15,
    imageUrl: "https://th.bing.com/th/id/OIG3.4e0FoVf54J6C8b0qpOOe?pid=ImgGn",
  },
  {
    id: 16,
    imageUrl: "https://th.bing.com/th/id/OIG2.Nlo58Haa.6fxOWQU1LKT?pid=ImgGn",
  },
  {
    id: 17,
    imageUrl: "https://th.bing.com/th/id/OIG3.fKU01J_pSJ.pDUwwmxdh?pid=ImgGn",
  },
  {
    id: 18,
    imageUrl: "https://th.bing.com/th/id/OIG2.qHCqdrWbDhGhhEoJiSLm?pid=ImgGn",
  },
  {
    id: 19,
    imageUrl: "https://th.bing.com/th/id/OIG3..X3Y33_5Ao_Osb7Agr42?pid=ImgGn",
  },
  {
    id: 20,
    imageUrl: "https://th.bing.com/th/id/OIG2.GErgDEJRiozrYfDEwaHh?pid=ImgGn",
  },
  {
    id: 21,
    imageUrl: "https://th.bing.com/th/id/OIG3.VOivH_rwtiwS86Vw1lJj?pid=ImgGn",
  },
];

app.use(cors());

app.get("/api/birthday-cards", (req, res) => {
  res.json(birthdayCards);
});

app.listen(port2, () => {
  console.log(`Server 2 is running on http://localhost:${port2}`);
});

cron.schedule("45 20 * * *", async () => {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const todayBirthdays = await Birthday.find({
      "data.date": {
        $regex: `^\\d{4}-${currentMonth < 10 ? "0" : ""}${currentMonth}-${
          currentDay < 10 ? "0" : ""
        }${currentDay}`,
      },
    });

    todayBirthdays.forEach(async (birthday) => {
      birthday.data.forEach(async (entry) => {
        const accountSid = "AC6e5f8a1a2d29f0106d2f2b37e9facd0c";
        const authToken = "4e86fdf83cf7c10d0262cbea4163e738";
        const client = require("twilio")(accountSid, authToken);

        try {
          await client.messages.create({
            body: entry.bdayMsg,
            from: "+15109240031",
            to: entry.phNo,
          });
          console.log(`Birthday wishes sent to ${entry.phNo}`);
        } catch (error) {
          console.error(
            `Error sending birthday wishes to ${entry.phNo}:`,
            error
          );
        }
      });
    });

    console.log("Scheduled task executed successfully");
  } catch (error) {
    console.error("Error executing scheduled task:", error);
  }
});

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`Merged server is running on http://localhost:${PORT}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const cron = require("node-cron");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost:27017/birthdayApp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const birthdaySchema = new mongoose.Schema({
//   _id: String,
//   data: [{
//     name: String,
//     bdayMsg: String,
//     phNo: String,
//     date: String,
//   }],
// });

// const Birthday = mongoose.model("Birthday", birthdaySchema);

// app.get("/", (req, res) => {
//   res.send("Hello, this is the server!");
// });

// app.post("/api/addBirthday", async (req, res) => {
//   try {
//     const { name, bdayMsg, phNo, date } = req.body;
//     const month = date.slice(5, 7);
//     const day = date.slice(8, 10);
//     const customId = `${month}${day}`;

//     let existingBirthday = await Birthday.findOne({ _id: customId });

//     if (existingBirthday) {
//       existingBirthday.data.push({ name, bdayMsg, phNo, date });
//       await existingBirthday.save();
//     } else {
//       const birthday = new Birthday({
//         _id: customId,
//         data: [{ name, bdayMsg, phNo, date }],
//       });
//       await birthday.save();
//     }

//     res.status(200).json({ message: "Birthday data added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Schedule the task to run every day at 8:00 AM
// cron.schedule("45 20  * * *", async () => {
//   try {
//     const today = new Date();
//     const currentMonth = today.getMonth() + 1;
//     const currentDay = today.getDate();

//     const todayBirthdays = await Birthday.find({
//       "data.date": {
//         $regex: `^\\d{4}-${currentMonth < 10 ? "0" : ""}${currentMonth}-${
//           currentDay < 10 ? "0" : ""
//         }${currentDay}`,
//       },
//     });

//     todayBirthdays.forEach(async (birthday) => {
//       birthday.data.forEach(async (entry) => {
//         const accountSid = "AC6e5f8a1a2d29f0106d2f2b37e9facd0c";
//         const authToken = "4e86fdf83cf7c10d0262cbea4163e738";
//         const client = require("twilio")(accountSid, authToken);

//         try {
//           await client.messages.create({
//             body: entry.bdayMsg,
//             from: "+15109240031",
//             to: entry.phNo,
//           });
//           console.log(`Birthday wishes sent to ${entry.phNo}`);
//         } catch (error) {
//           console.error(
//             `Error sending birthday wishes to ${entry.phNo}:`,
//             error
//           );
//         }
//       });
//     });

//     console.log("Scheduled task executed successfully");
//   } catch (error) {
//     console.error("Error executing scheduled task:", error);
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
