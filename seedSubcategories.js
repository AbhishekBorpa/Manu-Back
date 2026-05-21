import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./src/models/Category.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const categoriesWithSubcategories = [
  {
    categoryId: 1,
    name: "CNC Machining",
    icon: "https://img.icons8.com/fluency/96/cnc.png",
    type: "machine",
    subcategories: [
      "3-Axis CNC Milling",
      "5-Axis CNC Milling",
      "CNC Turning",
      "CNC Routing",
      "CNC Plasma Cutting",
      "CNC Laser Cutting",
      "CNC Waterjet Cutting",
      "CNC Grinding",
      "CNC Drilling",
      "CNC EDM (Electrical Discharge Machining)",
      "CNC Wire EDM",
      "CNC Gear Cutting",
      "CNC Swiss Machining",
      "Multi-Tasking Machining",
      "CNC Boring"
    ]
  },
  {
    categoryId: 2,
    name: "3D Printing & Additive Manufacturing",
    icon: "https://img.icons8.com/fluency/96/3d-printer.png",
    type: "machine",
    subcategories: [
      "FDM (Fused Deposition Modeling)",
      "SLA (Stereolithography)",
      "SLS (Selective Laser Sintering)",
      "SLM (Selective Laser Melting)",
      "DLP (Digital Light Processing)",
      "MJF (Multi Jet Fusion)",
      "EBM (Electron Beam Melting)",
      "PolyJet Printing",
      "Binder Jetting",
      "Directed Energy Deposition",
      "Material Extrusion",
      "Vat Photopolymerization",
      "Metal 3D Printing",
      "Ceramic 3D Printing",
      "Large Format 3D Printing"
    ]
  },
  {
    categoryId: 3,
    name: "Injection Molding",
    icon: "https://img.icons8.com/fluency/96/injection-molding.png",
    type: "machine",
    subcategories: [
      "Plastic Injection Molding",
      "Insert Molding",
      "Overmolding",
      "Two-Shot Molding",
      "Gas-Assist Injection Molding",
      "Micro Molding",
      "Thin-Wall Molding",
      "Metal Injection Molding (MIM)",
      "Ceramic Injection Molding (CIM)",
      "Rubber Injection Molding",
      "Reaction Injection Molding (RIM)",
      "Liquid Silicone Injection Molding",
      "High-Pressure Injection Molding",
      "Multi-Material Injection Molding",
      "Foam Injection Molding"
    ]
  },
  {
    categoryId: 4,
    name: "Sheet Metal Fabrication",
    icon: "https://img.icons8.com/fluency/96/sheet-metal.png",
    type: "industry",
    subcategories: [
      "Laser Cutting",
      "Plasma Cutting",
      "Waterjet Cutting",
      "CNC Punching",
      "Sheet Metal Bending",
      "Sheet Metal Rolling",
      "Deep Drawing",
      "Hydroforming",
      "Stamping",
      "Spinning",
      "Shearing",
      "Welding & Assembly",
      "Powder Coating",
      "Electroplating",
      "Sheet Metal Engraving"
    ]
  },
  {
    categoryId: 5,
    name: "Welding & Joining",
    icon: "https://img.icons8.com/fluency/96/welding.png",
    type: "industry",
    subcategories: [
      "MIG Welding (GMAW)",
      "TIG Welding (GTAW)",
      "Stick Welding (SMAW)",
      "Flux-Cored Arc Welding (FCAW)",
      "Submerged Arc Welding (SAW)",
      "Spot Welding",
      "Seam Welding",
      "Projection Welding",
      "Laser Welding",
      "Electron Beam Welding",
      "Friction Welding",
      "Ultrasonic Welding",
      "Brazing",
      "Soldering",
      "Orbital Welding"
    ]
  },
  {
    categoryId: 6,
    name: "Casting & Foundry",
    icon: "https://img.icons8.com/fluency/96/casting.png",
    type: "industry",
    subcategories: [
      "Sand Casting",
      "Investment Casting (Lost Wax)",
      "Die Casting",
      "Centrifugal Casting",
      "Continuous Casting",
      "Shell Mold Casting",
      "Vacuum Casting",
      "Gravity Casting",
      "Low-Pressure Die Casting",
      "High-Pressure Die Casting",
      "Permanent Mold Casting",
      "Plaster Mold Casting",
      "Ceramic Mold Casting",
      "Lost Foam Casting",
      "Investment Casting"
    ]
  },
  {
    categoryId: 7,
    name: "Forging",
    icon: "https://img.icons8.com/fluency/96/forging.png",
    type: "industry",
    subcategories: [
      "Open Die Forging",
      "Closed Die Forging",
      "Drop Forging",
      "Press Forging",
      "Roll Forging",
      "Cold Forging",
      "Hot Forging",
      "Warm Forging",
      "Upset Forging",
      "Isothermal Forging",
      "Precision Forging",
      "Rotary Forging",
      "Orbital Forging",
      "Net Shape Forging",
      "Near Net Shape Forging"
    ]
  },
  {
    categoryId: 8,
    name: "Surface Finishing",
    icon: "https://img.icons8.com/fluency/96/polishing.png",
    type: "industry",
    subcategories: [
      "Electroplating",
      "Anodizing",
      "Powder Coating",
      "Painting & Spraying",
      "Sandblasting",
      "Shot Peening",
      "Polishing & Buffing",
      "Grinding & Abrasive Finishing",
      "Honing",
      "Lapping",
      "Vibratory Finishing",
      "Tumbling",
      "Passivation",
      "Chemical Etching",
      "Electropolishing"
    ]
  },
  {
    categoryId: 9,
    name: "Heat Treatment",
    icon: "https://img.icons8.com/fluency/96/heat-treatment.png",
    type: "industry",
    subcategories: [
      "Annealing",
      "Normalizing",
      "Hardening",
      "Tempering",
      "Quenching",
      "Case Hardening",
      "Carburizing",
      "Nitriding",
      "Carbonitriding",
      "Induction Hardening",
      "Flame Hardening",
      "Precipitation Hardening",
      "Solution Treatment",
      "Stress Relieving",
      "Cryogenic Treatment"
    ]
  },
  {
    categoryId: 10,
    name: "Plastics & Rubber Processing",
    icon: "https://img.icons8.com/fluency/96/plastic-bottle.png",
    type: "industry",
    subcategories: [
      "Extrusion Molding",
      "Blow Molding",
      "Rotational Molding",
      "Compression Molding",
      "Transfer Molding",
      "Thermoforming",
      "Vacuum Forming",
      "Calendering",
      "Extrusion Blow Molding",
      "Injection Blow Molding",
      "Profile Extrusion",
      "Sheet Extrusion",
      "Film Extrusion",
      "Foam Molding",
      "Composite Molding"
    ]
  },
  {
    categoryId: 11,
    name: "Assembly & Automation",
    icon: "https://img.icons8.com/fluency/96/robot-arm.png",
    type: "industry",
    subcategories: [
      "Robotic Assembly",
      "Manual Assembly Lines",
      "Automated Assembly Systems",
      "Pick & Place Systems",
      "Conveyor Systems",
      "Packaging Automation",
      "Vision Inspection Systems",
      "Screw Driving & Fastening",
      "Press Fit Assembly",
      "Adhesive Bonding Assembly",
      "Welding Automation",
      "Palletizing Systems",
      "SCARA Robots",
      "Collaborative Robots (Cobots)",
      "Custom Automation Solutions"
    ]
  },
  {
    categoryId: 12,
    name: "Electrical & Electronics Manufacturing",
    icon: "https://img.icons8.com/fluency/96/electronics.png",
    type: "industry",
    subcategories: [
      "PCB Assembly (SMT & Through-Hole)",
      "Wire Harness Assembly",
      "Cable Assembly",
      "Box Build Assembly",
      "Panel Wiring",
      "Control Panel Fabrication",
      "Transformer Manufacturing",
      "Motor Rewinding",
      "Electronic Component Sourcing",
      "IoT Device Assembly",
      "Sensor Manufacturing",
      "LED Assembly",
      "Battery Pack Assembly",
      "Power Supply Assembly",
      "Embedded Systems Assembly"
    ]
  },
  {
    categoryId: 13,
    name: "Tool & Die Making",
    icon: "https://img.icons8.com/fluency/96/toolbox.png",
    type: "industry",
    subcategories: [
      "Progressive Die Design",
      "Compound Die Design",
      "Jigs & Fixtures Manufacturing",
      "Mold Base Manufacturing",
      "Insert Manufacturing",
      "Core & Cavity Manufacturing",
      "Wire EDM Tooling",
      "Die Sinking EDM",
      "Precision Machining of Dies",
      "Prototype Tooling",
      "Production Tooling",
      "Rapid Tooling",
      "Gauges & Fixtures",
      "Cutting Tool Manufacturing",
      "Form Tool Manufacturing"
    ]
  },
  {
    categoryId: 14,
    name: "Quality Control & Inspection",
    icon: "https://img.icons8.com/fluency/96/inspection.png",
    type: "industry",
    subcategories: [
      "CMM (Coordinate Measuring Machine) Inspection",
      "3D Scanning & Reverse Engineering",
      "X-Ray Inspection (NDT)",
      "Ultrasonic Testing (NDT)",
      "Magnetic Particle Inspection (NDT)",
      "Dye Penetrant Inspection (NDT)",
      "Eddy Current Testing (NDT)",
      "Leak Testing",
      "Pressure Testing",
      "Tensile Testing",
      "Hardness Testing",
      "Metallography",
      "Surface Roughness Measurement",
      "Visual Inspection",
      "Dimensional Inspection"
    ]
  },
  {
    categoryId: 15,
    name: "Packaging & Labeling",
    icon: "https://img.icons8.com/fluency/96/packaging.png",
    type: "industry",
    subcategories: [
      "Corrugated Box Manufacturing",
      "Carton Packaging",
      "Flexible Packaging",
      "Blister Packaging",
      "Shrink Wrapping",
      "Vacuum Packaging",
      "Bottle Filling & Capping",
      "Label Printing",
      "Shrink Sleeve Labeling",
      "Barcode & QR Labeling",
      "RFID Tagging",
      "Pallet Wrapping",
      "Crating & Wood Packaging",
      "Foam Packaging",
      "Tamper-Evident Packaging"
    ]
  }
];

const seedSubcategories = async () => {
  await connectDB();

  try {
    console.log("Clearing existing categories...");
    await Category.deleteMany();

    console.log("Seeding categories with subcategories...");
    const trimmed = categoriesWithSubcategories.map(cat => ({
      ...cat,
      subcategories: cat.subcategories.slice(0, 3)
    }));
    await Category.insertMany(trimmed);

    console.log(`${categoriesWithSubcategories.length} categories seeded with subcategories successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding subcategories:", error);
    process.exit(1);
  }
};

seedSubcategories();
