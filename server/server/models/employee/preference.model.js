import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema({
  employmentStatus: {
    type: String,
    enum: {
      values: [
        "Unemployed and looking",
        "Employed and looking",
        "Employed and not looking",
        "",
      ],
    },
  },
  idealSalary: {
    amount: Number,
    unit: {
      type: String,
      enum: {
        values: ["hourly", "weekly", "annually"],
      },
    },
  },
  planningToMove: {
    planning: {
      type: Boolean,
      default: false,
    },
    location: {
      //city name or zipcode
      type: String,
    },
    dateToMove: {
      type: String,
    },
  },
  randomShift: {
    type: Boolean,
    default: false,
  },
  randomShiftRole: {
    type: [String],
    enum: [
      "Line Cook AM",
      "Line Cook PM",
      "Pastry Cook",
      "Breakfast Cook",
      "Banquet Cook",
      "Grill Cook",
      "Bartender",
      "Banquet Bartender",
      "Barback",
      "Full-Service Server",
      "Food-Server-Counter",
      "Banquet Server",
      "Server Assitant",
      "Host/Hostess",
      "Dishwasher",
      "Barista",
      "Valet",
      "Hotel Front Desk",
      "Hotel Outlet Server",
      "Hotel Bellman",
      "Pool Attendant",
      "",
    ],
  },
  newOpportunity: {
    type: [String],
    enum: [
      "Director of Ops",
      "General Manager",
      "Executive Chef",
      "Sous Chef",
      "Pastry Chef",
      "Banquet Chef",
      "Manager",
      "Sales Manager",
      "Supervisor",
      "Banquet Captain",
      "Line Cook",
      "Pastry Cook",
      "Expeditor",
      "Food Runner",
      "Bartender",
      "Barback",
      "Food Server",
      "Counter Server",
      "Server Assitant",
      "Banquet Server",
      "Banquet Bartender",
      "Hostess",
      "Dishwasher",
      "Barista",
      "Expeditor",
      "Fastfood Cook",
      "Bar Manager",
      "Lead Bartender",
      "Fastfood Server",
      "Host/Hostess",
      "Velet",
      "Casher",
      "",
    ],
  },
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EmployeePreference", PreferenceSchema);
