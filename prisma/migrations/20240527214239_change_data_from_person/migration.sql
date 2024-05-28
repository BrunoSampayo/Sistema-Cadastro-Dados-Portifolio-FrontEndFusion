/*
  Warnings:

  - Made the column `facebookUrl` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubName` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubUrl` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instagramUrl` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedinUrl` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subTitle` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `Person` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "githubName" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "teamId" TEXT,
    "githubUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "facebookUrl" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Person_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("created_at", "facebookUrl", "githubName", "githubUrl", "id", "instagramUrl", "linkedinUrl", "name", "subTitle", "teamId", "text", "updated_at") SELECT "created_at", "facebookUrl", "githubName", "githubUrl", "id", "instagramUrl", "linkedinUrl", "name", "subTitle", "teamId", "text", "updated_at" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_key_check("Person");
PRAGMA foreign_keys=ON;
