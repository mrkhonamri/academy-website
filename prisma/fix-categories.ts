import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mapping: Record<string, string> = {
  "کلاس‌ها": "class",
  "اجراهای دانشجویان": "performance",
  "رویدادها": "event",
  "پشت صحنه": "behind-scenes",
  "عمومی": "general",
};

async function main() {
  console.log("Fixing gallery categories...");

  for (const [persian, english] of Object.entries(mapping)) {
    const result = await prisma.galleryItem.updateMany({
      where: { category: persian },
      data: { category: english },
    });
    if (result.count > 0) {
      console.log(`Converted ${result.count} items from "${persian}" to "${english}"`);
    }
  }

  console.log("Done!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());