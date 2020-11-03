import Employee from "../../models/employee/basic.model";
import twilio from "twilio";
const phoneTest = async (req, res) => {
  let twilioClient = twilio(
    "ACc843caee22d5fd96f2c76b63adeee9ae",
    "02b8175cdc6a80141bc942b379c64b09"
  );
  var params = {
    to: "8615140345091",
    from: "8618241108713", // Your twilio phone number
    // url: process.env.TWIML_SERVER_URL // full URL of /twiml route on your server
  };

  twilioClient.makeCall(params, (err, message) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send({ verificationCode: verificationCode });
    }
  });
};

const searchEmployee = async (filter) => {
  // {
  //   searchAddress: { street: 'WorldStreet', state: 'NewYork', zipcode: '92303' },
  //   locations: { type: 'Point', coordinates: [ -99.066067, 39.390897 ] },
  //   shift: [ 'Lunch', 'Dinner' ],
  //   systems: [ 'Clover', 'Hostme' ],
  //   _id: 5f95aeec6a169d513c59dff8,
  //   primary: 'Director of Ops',
  //   secondary: 'Executive Chef',
  //   style: 'Fast Food',
  //   cuisine: 'Seafood',
  //   wineKnowledge: 'Barefoot',
  //   cocktailKnowledge: 'White Claw',
  //   employer: 5f91b625021e1f2644148505,
  //   createdAt: 2020-10-25T16:59:24.845Z,
  //   __v: 2
  // }
  const lat = filter.locations.coordinates[0];
  const lng = filter.locations.coordinates[1];
  const primaryJob = filter.primary;
  const secondaryJob = filter.secondary;
  const shift = filter.shift;
  const wine = filter.wineKnowledge;
  const cocktail = filter.cocktailKnowledge;
  const style = filter.style;
  const cuisine = filter.cuisine;
  const operatingsys = filter.systems[0];
  const reservationsys = filter.systems[1];
  console.log(lng, lat);
  try {
    const professions = await Employee.aggregate([
      {
        $geoNear: {
          near: [lat, lng],
          distanceField: "distBetweenEmp",
          distanceMultiplier: 3963.2,
          spherical: true,
        },
      },
      { $project: { _id: 1, locations: 1, slug: 1, distBetweenEmp: 1 } },
      {
        $lookup: {
          from: "employeeskills",
          localField: "_id",
          foreignField: "employee",
          as: "employeeskill",
        },
      },
      { $unwind: "$employeeskill" },
      {
        $lookup: {
          from: "employeepreferences",
          localField: "_id",
          foreignField: "employee",
          as: "employeepreference",
        },
      },
      { $unwind: "$employeepreference" },
      {
        $addFields: {
          diffdist: {
            $subtract: ["$distBetweenEmp", "$employeeskill.milesToWork"],
          },
        },
      },
      { $match: { diffdist: { $lte: 0 } } },
      {
        $match: {
          "employeeskill.shift": { $all: shift },
          "employeeskill.primaryJob.title": primaryJob,
          "employeeskill.secondaryJob.title": secondaryJob,
        },
      },
      {
        $addFields: {
          totalpoints: {
            $add: [
              // Add points if primary job matched (years x 2.5)
              { $multiply: ["$employeeskill.primaryJob.years", 2.5] },
              // Add points if secondary job matched (years x 2.0)
              { $multiply: ["$employeeskill.secondaryJob.years", 2.0] },
              // Add points if wineKnowledge matched (+5)
              {
                $cond: {
                  if: { $eq: ["$employeeskill.wineKnowledge", wine] },
                  then: 5,
                  else: 0,
                },
              },
              // Add points if cocktailKnowledge matched (+5)
              {
                $cond: {
                  if: { $eq: ["$employeeskill.cocktailKnowledge", cocktail] },
                  then: 5,
                  else: 0,
                },
              },
              // Add points if style matched (years x 1.5)
              {
                $cond: {
                  if: { $eq: ["$employeeskill.style.type", style] },
                  then: {
                    $add: [{ $multiply: ["$employeeskill.style.years", 1.5] }],
                  },
                  else: 0,
                },
              },
              // Add points if cuisine matched(years x 1.0)
              {
                $cond: {
                  if: { $in: [cuisine, "$employeeskill.cuisine.type"] },
                  then: {
                    $add: [
                      {
                        $arrayElemAt: [
                          "$employeeskill.cuisine.years",
                          {
                            $indexOfArray: [
                              "$employeeskill.cuisine.type",
                              cuisine,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  else: 0,
                },
              },
              // Add 2 points if operating system matched
              {
                $cond: {
                  if: { $in: [operatingsys, "$employeeskill.systems"] },
                  then: 2,
                  else: 0,
                },
              },
              // Add 2 points if reservation system matched
              {
                $cond: {
                  if: { $in: [reservationsys, "$employeeskill.systems"] },
                  then: 2,
                  else: 0,
                },
              },
            ],
          },
        },
      },
      { $sort: { totalpoints: -1 } },
    ]);
    return professions;
  } catch (err) {
    return err;
  }
};

export default { searchEmployee, phoneTest };
