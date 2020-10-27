import Employee from "../../models/employee/basic.model";

const aggtable = async (req, res) => {
  let lng = -71;
  let lat = 42;
  let primaryJob = "Hotel Outlet Staff";
  let secondaryJob = "General Manager";
  let shift = ["Lunch"];
  let wine = "Silver Oak";
  let cocktail = "Old Fashioned";
  let style = "Fast Food";
  let cuisine = "Kosher";
  let operatingsys = "Clover";
  let reservationsys = "Hostme";
  console.log(lng, lat);

  const professions = await Employee.aggregate([
    {
      $geoNear: {
        near: [-73.99279, 40.719296],
        distanceField: "distBetweenEmp",
        distanceMultiplier: 3963.2,
        spherical: true,
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

  return res.status(200).json({
    result: professions,
  });
};

export default { aggtable };
