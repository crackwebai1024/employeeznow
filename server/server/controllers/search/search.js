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
  let rate = 0;
  const { amount, unit } = filter.idealSalary;
  if (amount !== undefined) {
    switch (unit) {
      case "hourly":
        rate = amount;
        break;
      case "weekly":
        rate = amount / 40;
        break;
      case "annually":
        rate = amount / 1920;
        break;
    }
  }
  console.log(lng, lat);
  console.log("this is filter ==> ", filter);
  console.log(shift);
  try {
    const employer = await Employer.findById(employerID);
    const name = employer.name;
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
      {
        $lookup: {
          from: "employeeexperiences",
          localField: "_id",
          foreignField: "employee",
          as: "employeeexperience",
        },
      },
      { $unwind: "$employeepreference" },
      { $unwind: "$employeeexperience" },
      {
        $addFields: {
          diffdist: {
            $subtract: ["$distBetweenEmp", "$employeeskill.milesToWork"],
          },
          // get the intersection of shifts between filter and employee
          commonShift: { $setIntersection: ["$employeeskill.shift", shift] },
        },
      },
      { $match: { diffdist: { $lte: 0 } } },
      {
        $match: {
          // check the intersection exists
          commonShift: { $exists: true },
          "employeeskill.primaryJob.title": primaryJob,
          "employeeskill.primaryJob.years": { $gte: minimumExp },
          "employeeexperience.exclude": { $nin: [name] },
        },
      },
      {
        $addFields: {
          ratediff: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$employeepreference.idealSalary.unit", "hourly"],
                  },
                  then: {
                    $abs: {
                      $subtract: [
                        "$employeepreference.idealSalary.amount",
                        rate,
                      ],
                    },
                  },
                },
                {
                  case: {
                    $eq: ["$employeepreference.idealSalary.unit", "weekly"],
                  },
                  then: {
                    $abs: {
                      $subtract: [
                        {
                          $divide: [
                            "$employeepreference.idealSalary.amount",
                            40,
                          ],
                        },
                        rate,
                      ],
                    },
                  },
                },
                {
                  case: {
                    $eq: ["$employeepreference.idealSalary.unit", "weekly"],
                  },
                  then: {
                    $abs: {
                      $subtract: [
                        {
                          $divide: [
                            "$employeepreference.idealSalary.amount",
                            1920,
                          ],
                        },
                        rate,
                      ],
                    },
                  },
                },
              ],
              default: undefined,
            },
          },
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
                  if: { $in: [style[0], "$employeeskill.style.type"] },
                  then: {
                    $add: [
                      {
                        $multiply: [
                          {
                            $arrayElemAt: [
                              "$employeeskill.style.years",
                              {
                                $indexOfArray: [
                                  "$employeeskill.style.type",
                                  style[0],
                                ],
                              },
                            ],
                          },
                          1.5,
                        ],
                      },
                    ],
                  },
                  else: 0,
                },
              },
              {
                $cond: {
                  if: { $in: [style[1], "$employeeskill.style.type"] },
                  then: {
                    $add: [
                      {
                        $multiply: [
                          {
                            $arrayElemAt: [
                              "$employeeskill.style.years",
                              {
                                $indexOfArray: [
                                  "$employeeskill.style.type",
                                  style[1],
                                ],
                              },
                            ],
                          },
                          1.5,
                        ],
                      },
                    ],
                  },
                  else: 0,
                },
              },
              {
                $cond: {
                  if: { $in: [style[2], "$employeeskill.style.type"] },
                  then: {
                    $add: [
                      {
                        $multiply: [
                          {
                            $arrayElemAt: [
                              "$employeeskill.style.years",
                              {
                                $indexOfArray: [
                                  "$employeeskill.style.type",
                                  style[2],
                                ],
                              },
                            ],
                          },
                          1.5,
                        ],
                      },
                    ],
                  },
                  else: 0,
                },
              },
              // add points if hourly rate fits
              {
                $switch: {
                  branches: [
                    {
                      case: {
                        $lte: ["$ratediff", rate * 0.05],
                      },
                      then: 6,
                    },
                    {
                      case: {
                        $and: [
                          { $gt: ["$ratediff", rate * 0.05] },
                          { $lte: ["$ratediff", rate * 0.1] },
                        ],
                      },
                      then: 4,
                    },
                    {
                      case: {
                        $and: [
                          { $gt: ["$ratediff", rate * 0.1] },
                          { $lte: ["$ratediff", rate * 0.15] },
                        ],
                      },
                      then: 2,
                    },
                  ],
                  default: 0,
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
    console.log(employer);
    return professions;
  } catch (err) {
    return err;
  }
};

export default { searchEmployee };
