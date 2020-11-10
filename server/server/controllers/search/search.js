import Employee from "../../models/employee/basic.model";
import Employer from "../../models/employer/basic.model";

const searchEmployee = async (filter) => {
  const lat = filter.locations.coordinates[0];
  const lng = filter.locations.coordinates[1];
  const primaryJob = filter.primary;
  const minimumExp = filter.minimumexp;
  const shift = filter.shift;
  const wine = filter.wineKnowledge;
  const cocktail = filter.cocktailKnowledge;
  const style = filter.style;
  const cuisine = filter.cuisine;
  const operatingsys = filter.systems[0];
  const reservationsys = filter.systems[1];
  const employerID = filter.employer;
  console.log(lng, lat);
  console.log("this is filter ==> ", filter);
  try {
    const employer = await Employer.findById(employerID);
    const professions = await Employee.aggregate([
      {
        $geoNear: {
          near: [lat, lng],
          distanceField: "distBetweenEmp",
          distanceMultiplier: 3963.2,
          spherical: true,
        },
      },
      {
        $project: {
          _id: 1,
          locations: 1,
          slug: 1,
          distBetweenEmp: 1,
          employeezNowId: 1,
          purchased: {
            $cond: {
              if: { $in: ["$_id", employer.interestedEmployees] },
              then: true,
              else: false,
            },
          },
        },
      },
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
          "employeeskill.primaryJob.years": { $gte: minimumExp },
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
                  if: { $in: ["$employeeskill.style.type", style] },
                  then: {
                    $add: [{ $multiply: ["$employeeskill.style.years", 1.5] }],
                  },
                  else: 0,
                },
              },
              // Add points if cuisine matched(years x 1.0)
              {
                $cond: {
                  if: { $in: [cuisine[0], "$employeeskill.cuisine.type"] },
                  then: {
                    $add: [
                      {
                        $arrayElemAt: [
                          "$employeeskill.cuisine.years",
                          {
                            $indexOfArray: [
                              "$employeeskill.cuisine.type",
                              cuisine[0],
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  else: 0,
                },
              },
              {
                $cond: {
                  if: { $in: [cuisine[1], "$employeeskill.cuisine.type"] },
                  then: {
                    $add: [
                      {
                        $arrayElemAt: [
                          "$employeeskill.cuisine.years",
                          {
                            $indexOfArray: [
                              "$employeeskill.cuisine.type",
                              cuisine[1],
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  else: 0,
                },
              },
              {
                $cond: {
                  if: { $in: [cuisine[2], "$employeeskill.cuisine.type"] },
                  then: {
                    $add: [
                      {
                        $arrayElemAt: [
                          "$employeeskill.cuisine.years",
                          {
                            $indexOfArray: [
                              "$employeeskill.cuisine.type",
                              cuisine[2],
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
    console.log(professions);
    return professions;
  } catch (err) {
    return err;
  }
};

export default { searchEmployee };
