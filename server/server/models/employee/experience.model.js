import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  summary: String,
  primaryJob: {
    company: String,
    title: {
      type: String,
      enum: [
        "Regional Manager",
        "Director of Ops",
        "Director of F&B",
        "General Manager",
        "Executive Chef",
        "Kitchen Manager",
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
        "Valet",
        "Casher",
        "Bar Manager",
        "Chef De Cuisine",
        "Grill Cook",
        "Saute Cook",
        "Fry Cook",
        "Pantry Cook",
        "Hotel Front Desk",
        "Hotel Outlet Server",
        "Hotel Bellman",
        "Pool Attendant",
        "",
      ],
    },
    startDate: Date,
    endDate: Date,
    description: String,
    years: Number,
    current: {
      type: Boolean,
      default: false,
    },
  },
  secondaryJob: {
    company: String,
    title: {
      type: String,
      enum: [
        "Regional Manager",
        "Director of Ops",
        "Director of F&B",
        "General Manager",
        "Executive Chef",
        "Kitchen Manager",
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
        "Valet",
        "Casher",
        "Bar Manager",
        "Chef De Cuisine",
        "Grill Cook",
        "Saute Cook",
        "Fry Cook",
        "Pantry Cook",
        "Hotel Front Desk",
        "Hotel Outlet Server",
        "Hotel Bellman",
        "Pool Attendant",
        "",
      ],
    },
    startDate: Date,
    endDate: Date,
    description: String,
    years: Number,
  },
  otherJob: [
    {
      company: String,
      title: {
        type: String,
        enum: [
          "Regional Manager",
          "Director of Ops",
          "Director of F&B",
          "General Manager",
          "Executive Chef",
          "Kitchen Manager",
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
          "Valet",
          "Casher",
          "Bar Manager",
          "Chef De Cuisine",
          "Grill Cook",
          "Saute Cook",
          "Fry Cook",
          "Pantry Cook",
          "Hotel Front Desk",
          "Hotel Outlet Server",
          "Hotel Bellman",
          "Pool Attendant",
          "",
        ],
      },
      startDate: String,
      endDate: String,
      description: String,
      years: Number,
    },
  ],
  exclude: {
    name: [String],
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

export default mongoose.model("EmployeeExperience", ExperienceSchema);
