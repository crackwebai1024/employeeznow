import Employee from "../../models/employee/basic.model";
import EmployeeExperience from "../../models/employee/experience.model";
import EmployeePreference from "../../models/employee/preference.model";
import EmployeeSkill from "../../models/employee/skills.model";

const aggtable = async (req, res) => {
  let lng = -71;
  let lat = 42;
  console.log(lng, lat);
  const professions = await EmployeePreference.aggregate([
    {
      // 1) find professions in range of zipcode and if shifts matches
      $facet: {
        matched: [
          {
            $lookup: {
              from: "employees",
              localField: "employee",
              foreignField: "_id",
              as: "employee",
            },
          },
          { $unwind: "$employee" },
          {
            $lookup: {
              from: "employeeskills",
              localField: "employee._id",
              foreignField: "employee",
              as: "employeeskill",
            },
          },
          { $unwind: "$employeeskill" },
          {
            $match: {
              "employeeskill.shift": { $all: ["Lunch"] },
              // "employee.primaryJob.title": "Bartender",
              // "employee.secondJob.title": "waiter",
            },
          },
          {
            $match: {
              "employee.locations": {
                $geoWithin: {
                  $centerSphere: [[lng, lat], 200 / 3963.2],
                },
              },
            },
          },
        ],
        // calcPoints: [
        //   {
        //     $project: {
        //       // Add points if primary job matched (years x 2.5)
        //       sub1: {
        //         $add: [{ $multiply: ["$employee.primaryJob.years", 2.5] }],
        //       },
        //       // Add points if secondary job matched (years x 2.0)
        //       sub2: {
        //         $add: [{ $multiply: ["$secondaryJob.years", 2.0] }],
        //       },
        //       // Add points if wineKnowledge matched (+5)
        //       sub3: {
        //         $cond: {
        //           if: { $eq: ["$wineKnowledge", wine] },
        //           then: 5,
        //           else: 0,
        //         },
        //       },
        //       // Add points if cocktailKnowledge matched (+5)
        //       sub4: {
        //         $cond: {
        //           if: { $eq: ["$cocktailKnowledge", cocktail] },
        //           then: 5,
        //           else: 0,
        //         },
        //       },
        //       // Add points if style matched (years x 1.5)
        //       sub5: {
        //         $cond: {
        //           if: { $eq: ["$style.type", style] },
        //           then: {
        //             $add: [{ $multiply: ["$style.years", 1.5] }],
        //           },
        //           else: 0,
        //         },
        //       },
        //       // Add points if cuisine matched(years x 1.0)
        //       sub6: {
        //         $cond: {
        //           if: { $eq: ["$cuisine.type", cuisine] },
        //           then: {
        //             $add: [{ $multiply: ["$cuisine.years", 1.0] }],
        //           },
        //           else: 0,
        //         },
        //       },
        //       // Add points if systems matched (number of systems x 2.0)
        //     },
        //   },
        //   {
        //     $group: {
        //       _id: "$_id",
        //       // calculate point total: { $addToSet: '$sub1' },
        //       total: {
        //         $push: {
        //           $sum: {
        //             $add: [
        //               "$sub1",
        //               "$sub2",
        //               "$sub3",
        //               "$sub4",
        //               "$sub5",
        //               "$sub6",
        //             ],
        //           },
        //         },
        //       },
        //     },
        //   },
        //   {
        //     // progect only total points
        //     $project: {
        //       points: { $max: "$total" },
        //     },
        //   },
        // ],
      },
    },
  ]);

  return res.status(200).json({
    result: professions,
  });
};

export default { aggtable };
