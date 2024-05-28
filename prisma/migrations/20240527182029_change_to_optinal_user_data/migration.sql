/*
  Warnings:

  - You are about to drop the `Social` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `socialId` on the `Person` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Social_personId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Social";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "subTitle" TEXT,
    "text" TEXT,
    "teamId" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "facebookUrl" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Person_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("created_at", "id", "imageUrl", "name", "subTitle", "teamId", "text", "updated_at") SELECT "created_at", "id", "imageUrl", "name", "subTitle", "teamId", "text", "updated_at" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_key_check("Person");
PRAGMA foreign_keys=ON;
