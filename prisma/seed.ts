import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ageGroups = [
  {
    title: "کودکان",
    minAge: 4,
    maxAge: 6,
    sortOrder: 1,
    levels: [
      "L.P", "P1.a", "P1.b", "P2.a", "P2.b", "P3.a", "P3.b",
      "MT 1a", "MT 1b", "MT 2a", "MT 2b",
      "Big 1a", "Big 1b", "Big 1c", "Big 2a", "Big 2b", "Big 2c",
      "Big 3a", "Big 3b", "Big 3c", "Big 4a", "Big 4b", "Big 4c",
      "Big 5a", "Big 5b", "Big 5c", "Big 6a", "Big 6b", "Big 6c",
      "TN 1a", "TN 1b", "TN 1c", "TN 2a", "TN 2b", "TN 2c", "TN 3a", "TN 3b", "TN 3c",
      "Sum 1a", "Sum 1b", "Sum 1c", "Sum 2a", "Sum 2b", "Sum 2c",
    ],
  },
  {
    title: "کودکان و نوجوانان",
    minAge: 7,
    maxAge: 9,
    sortOrder: 2,
    levels: [
      "F1.a", "F1.b", "F2.a", "F2.b", "F3.a", "F3.b",
      "Fam 1a", "Fam 1b", "Fam 1c", "Fam 2a", "Fam 2b", "Fam 2c",
      "Fam 3a", "Fam 3b", "Fam 3c", "Fam 4a", "Fam 4b", "Fam 4c",
      "Fam 5a", "Fam 5b", "Fam 5c", "Fam 6a", "Fam 6b", "Fam 6c",
      "TN 1a", "TN 1b", "TN 1c", "TN 2a", "TN 2b", "TN 2c", "TN 3a", "TN 3b", "TN 3c",
      "Sum 1a", "Sum 1b", "Sum 1c", "Sum 2a", "Sum 2b", "Sum 2c",
    ],
  },
  {
    title: "نونهالان",
    minAge: 10,
    maxAge: 12,
    sortOrder: 3,
    levels: [
      "ET 1a", "ET 1b", "ET 2a", "ET 2b", "ET 3a", "ET 3b",
      "ET 4a", "ET 4b", "ET 5a", "ET 5b", "ET 6a", "ET 6b",
      "TN 1a", "TN 1b", "TN 1c", "TN 2a", "TN 2b", "TN 2c", "TN 3a", "TN 3b", "TN 3c",
      "Sum 1a", "Sum 1b", "Sum 1c", "Sum 2a", "Sum 2b", "Sum 2c",
    ],
  },
  {
    title: "نوجوانان",
    minAge: 13,
    maxAge: 15,
    sortOrder: 4,
    levels: [
      "Fund 1a", "Fund 1b", "Fund 1c",
      "TN 1a", "TN 1b", "TN 1c", "TN 2a", "TN 2b", "TN 2c", "TN 3a", "TN 3b", "TN 3c",
      "Sum 1a", "Sum 1b", "Sum 1c", "Sum 2a", "Sum 2b", "Sum 2c",
    ],
  },
  {
    title: "بزرگسالان",
    minAge: 16,
    maxAge: 99,
    sortOrder: 5,
    levels: [
      "FC 1", "FC 2", "FC 3", "FC 4",
      "Pass 1", "Pass 2",
      "IELTS",
    ],
  },
];

async function main() {
  console.log("Seeding age groups and levels...");

  for (const group of ageGroups) {
    const createdGroup = await prisma.ageGroup.create({
      data: {
        title: group.title,
        minAge: group.minAge,
        maxAge: group.maxAge,
        sortOrder: group.sortOrder,
        isActive: true,
        levels: {
          create: group.levels.map((code, index) => ({
            title: code,
            code,
            sortOrder: index,
            isActive: true,
          })),
        },
      },
    });
    console.log(`Created group: ${createdGroup.title} with ${group.levels.length} levels`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });