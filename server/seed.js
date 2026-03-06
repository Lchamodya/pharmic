require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Category = require("./models/category");
const Medicine = require("./models/medicine");
const User = require("./models/user");

const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;
    await mongoose.connect(uri, {
      dbName: dbName,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const clearDatabase = async () => {
  await Category.deleteMany({});
  await Medicine.deleteMany({});
  await User.deleteMany({});
  console.log("Database cleared");
};

const seedCategories = async () => {
  const categories = [
    {
      name: "Pain Relief",
      description: "Medications for pain management and relief",
    },
    {
      name: "Cold & Flu",
      description: "Treatments for cold, flu, and respiratory conditions",
    },
    {
      name: "Digestive Health",
      description: "Medications for digestive and gastrointestinal issues",
    },
    {
      name: "Vitamins & Supplements",
      description: "Essential vitamins and dietary supplements",
    },
    {
      name: "Allergy Relief",
      description: "Antihistamines and allergy medications",
    },
    {
      name: "Skin Care",
      description: "Topical treatments and skin care medications",
    },
    {
      name: "Diabetes Care",
      description: "Medications and supplies for diabetes management",
    },
    {
      name: "Heart Health",
      description: "Cardiovascular medications and supplements",
    },
  ];

  const createdCategories = await Category.insertMany(categories);
  console.log(`${createdCategories.length} categories created`);
  return createdCategories;
};

const seedMedicines = async (categories) => {
  const medicines = [
    // Pain Relief
    {
      name: "Paracetamol 500mg",
      category: categories[0]._id,
      description: "Effective pain relief and fever reducer. Suitable for headaches, muscle aches, and minor pains.",
      quantity: 150,
      amount: 5.99,
      imageUrl: "https://placehold.co/400x400/FF6B6B/FFFFFF?text=Paracetamol\n500mg\nPain+Relief&font=roboto",
    },
    {
      name: "Ibuprofen 400mg",
      category: categories[0]._id,
      description: "Anti-inflammatory pain reliever for moderate to severe pain, including arthritis and muscle pain.",
      quantity: 120,
      amount: 8.99,
      imageUrl: "https://placehold.co/400x400/C92A2A/FFFFFF?text=Ibuprofen\n400mg\nAnti-Inflammatory&font=roboto",
    },
    {
      name: "Aspirin 75mg",
      category: categories[0]._id,
      description: "Low-dose aspirin for pain relief and cardiovascular protection.",
      quantity: 200,
      amount: 4.50,
      imageUrl: "https://placehold.co/400x400/FFA07A/FFFFFF?text=Aspirin\n75mg\nLow+Dose&font=roboto",
    },
    
    // Cold & Flu
    {
      name: "Cold & Flu Relief Capsules",
      category: categories[1]._id,
      description: "Complete relief from cold and flu symptoms including congestion, fever, and body aches.",
      quantity: 100,
      amount: 12.99,
      imageUrl: "https://placehold.co/400x400/7950F2/FFFFFF?text=Cold+%26+Flu\nRelief\nCapsules&font=roboto",
    },
    {
      name: "Cough Syrup 200ml",
      category: categories[1]._id,
      description: "Soothing cough suppressant for dry and productive coughs.",
      quantity: 80,
      amount: 9.99,
      imageUrl: "https://placehold.co/400x400/5F3DC4/FFFFFF?text=Cough+Syrup\n200ml\nLiquid&font=roboto",
    },
    {
      name: "Throat Lozenges",
      category: categories[1]._id,
      description: "Medicated lozenges for sore throat relief with antibacterial properties.",
      quantity: 150,
      amount: 6.99,
      imageUrl: "https://placehold.co/400x400/9775FA/FFFFFF?text=Throat\nLozenges\nMedicated&font=roboto",
    },
    
    // Digestive Health
    {
      name: "Antacid Tablets",
      category: categories[2]._id,
      description: "Fast-acting relief from heartburn, acid indigestion, and upset stomach.",
      quantity: 130,
      amount: 7.99,
      imageUrl: "https://placehold.co/400x400/20C997/FFFFFF?text=Antacid\nTablets\nDigestive+Health&font=roboto",
    },
    {
      name: "Probiotic Capsules",
      category: categories[2]._id,
      description: "Supports digestive health with beneficial bacteria for gut balance.",
      quantity: 90,
      amount: 24.99,
      imageUrl: "https://placehold.co/400x400/12B886/FFFFFF?text=Probiotic\nCapsules\nGut+Health&font=roboto",
    },
    {
      name: "Anti-Diarrheal Tablets",
      category: categories[2]._id,
      description: "Effective treatment for acute diarrhea and traveler's diarrhea.",
      quantity: 110,
      amount: 8.49,
      imageUrl: "https://placehold.co/400x400/38D9A9/FFFFFF?text=Anti-Diarrheal\nTablets\nFast+Relief&font=roboto",
    },
    
    // Vitamins & Supplements
    {
      name: "Vitamin C 1000mg",
      category: categories[3]._id,
      description: "High-strength vitamin C for immune support and antioxidant protection.",
      quantity: 200,
      amount: 15.99,
      imageUrl: "https://placehold.co/400x400/FAB005/FFFFFF?text=Vitamin+C\n1000mg\nImmune+Support&font=roboto",
    },
    {
      name: "Multivitamin Daily",
      category: categories[3]._id,
      description: "Complete daily multivitamin with essential nutrients for overall health.",
      quantity: 180,
      amount: 19.99,
      imageUrl: "https://placehold.co/400x400/FD7E14/FFFFFF?text=Multivitamin\nDaily\nComplete+Formula&font=roboto",
    },
    {
      name: "Vitamin D3 2000IU",
      category: categories[3]._id,
      description: "Supports bone health, immune function, and mood regulation.",
      quantity: 160,
      amount: 14.99,
      imageUrl: "https://placehold.co/400x400/F59F00/FFFFFF?text=Vitamin+D3\n2000IU\nBone+Health&font=roboto",
    },
    {
      name: "Omega-3 Fish Oil",
      category: categories[3]._id,
      description: "Essential fatty acids for heart, brain, and joint health.",
      quantity: 140,
      amount: 22.99,
      imageUrl: "https://placehold.co/400x400/FF922B/FFFFFF?text=Omega-3\nFish+Oil\nHeart+%26+Brain&font=roboto",
    },
    
    // Allergy Relief
    {
      name: "Antihistamine Tablets",
      category: categories[4]._id,
      description: "Non-drowsy 24-hour allergy relief from pollen, dust, and pet allergies.",
      quantity: 120,
      amount: 11.99,
      imageUrl: "https://placehold.co/400x400/DA77F2/FFFFFF?text=Antihistamine\nTablets\n24hr+Relief&font=roboto",
    },
    {
      name: "Nasal Spray for Allergies",
      category: categories[4]._id,
      description: "Fast relief from nasal congestion and allergic rhinitis.",
      quantity: 85,
      amount: 13.99,
      imageUrl: "https://placehold.co/400x400/CC5DE8/FFFFFF?text=Nasal+Spray\nAllergy\nFast+Acting&font=roboto",
    },
    
    // Skin Care
    {
      name: "Hydrocortisone Cream 1%",
      category: categories[5]._id,
      description: "Topical steroid for treating skin inflammation, itching, and rashes.",
      quantity: 95,
      amount: 9.49,
      imageUrl: "https://placehold.co/400x400/4DABF7/FFFFFF?text=Hydrocortisone\nCream+1%25\nTopical&font=roboto",
    },
    {
      name: "Antiseptic Cream",
      category: categories[5]._id,
      description: "Prevents infection in minor cuts, scrapes, and burns.",
      quantity: 110,
      amount: 6.99,
      imageUrl: "https://placehold.co/400x400/339AF0/FFFFFF?text=Antiseptic\nCream\nFirst+Aid&font=roboto",
    },
    {
      name: "Acne Treatment Gel",
      category: categories[5]._id,
      description: "Benzoyl peroxide gel for treating and preventing acne breakouts.",
      quantity: 75,
      amount: 16.99,
      imageUrl: "https://placehold.co/400x400/74C0FC/FFFFFF?text=Acne+Treatment\nGel\nClear+Skin&font=roboto",
    },
    
    // Diabetes Care
    {
      name: "Blood Glucose Test Strips (50ct)",
      category: categories[6]._id,
      description: "Accurate test strips for monitoring blood glucose levels.",
      quantity: 60,
      amount: 29.99,
      imageUrl: "https://placehold.co/400x400/228BE6/FFFFFF?text=Test+Strips\n50+Count\nGlucose+Monitor&font=roboto",
    },
    {
      name: "Lancets (100ct)",
      category: categories[6]._id,
      description: "Sterile lancets for blood glucose testing with minimal discomfort.",
      quantity: 90,
      amount: 12.99,
      imageUrl: "https://placehold.co/400x400/1C7ED6/FFFFFF?text=Lancets\n100+Count\nSterile&font=roboto",
    },
    
    // Heart Health
    {
      name: "Omega-3 EPA/DHA",
      category: categories[7]._id,
      description: "High-potency fish oil for cardiovascular health and cholesterol management.",
      quantity: 100,
      amount: 28.99,
      imageUrl: "https://placehold.co/400x400/FF6B6B/FFFFFF?text=Omega-3\nEPA%2FDHA\nCardiovascular&font=roboto",
    },
    {
      name: "CoQ10 200mg",
      category: categories[7]._id,
      description: "Coenzyme Q10 for heart health and cellular energy production.",
      quantity: 70,
      amount: 32.99,
      imageUrl: "https://placehold.co/400x400/E03131/FFFFFF?text=CoQ10\n200mg\nHeart+Health&font=roboto",
    },
  ];

  const createdMedicines = await Medicine.insertMany(medicines);
  console.log(`${createdMedicines.length} medicines created`);
  return createdMedicines;
};

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  const users = [
    {
      name: "Admin User",
      email: "admin@pharmic.com",
      address: "123 Admin Street, Medical District, City 12345",
      mobile: "+1234567890",
      password: adminPassword,
      role: "Admin",
    },
    {
      name: "John Smith",
      email: "john.smith@email.com",
      address: "456 Oak Avenue, Suburb, City 12346",
      mobile: "+1234567891",
      password: hashedPassword,
      role: "User",
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      address: "789 Maple Drive, Downtown, City 12347",
      mobile: "+1234567892",
      password: hashedPassword,
      role: "User",
    },
    {
      name: "Michael Chen",
      email: "mchen@email.com",
      address: "321 Pine Street, Uptown, City 12348",
      mobile: "+1234567893",
      password: hashedPassword,
      role: "User",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@email.com",
      address: "654 Elm Road, Westside, City 12349",
      mobile: "+1234567894",
      password: hashedPassword,
      role: "User",
    },
  ];

  const createdUsers = await User.insertMany(users);
  console.log(`${createdUsers.length} users created`);
  console.log("\nLogin Credentials:");
  console.log("==================");
  console.log("Admin:");
  console.log("  Email: admin@pharmic.com");
  console.log("  Password: admin123");
  console.log("\nRegular Users:");
  console.log("  Email: john.smith@email.com");
  console.log("  Password: password123");
  console.log("  (Same password for all users)");
  return createdUsers;
};

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    console.log("\n🌱 Starting database seeding...\n");
    
    await clearDatabase();
    
    const categories = await seedCategories();
    const medicines = await seedMedicines(categories);
    const users = await seedUsers();
    
    console.log("\n✅ Database seeding completed successfully!");
    console.log(`\nSummary:`);
    console.log(`- ${categories.length} categories`);
    console.log(`- ${medicines.length} medicines`);
    console.log(`- ${users.length} users`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
