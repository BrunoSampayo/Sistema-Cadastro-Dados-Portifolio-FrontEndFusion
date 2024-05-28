/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `alt` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Project` table. All the data in the column will be lost.
  - Added the required column `projectUrl` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "githubName" TEXT,
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
INSERT INTO "new_Person" ("created_at", "facebookUrl", "githubUrl", "id", "instagramUrl", "linkedinUrl", "name", "subTitle", "teamId", "text", "updated_at") SELECT "created_at", "facebookUrl", "githubUrl", "id", "instagramUrl", "linkedinUrl", "name", "subTitle", "teamId", "text", "updated_at" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectUrl" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "Project_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("id", "personId") SELECT "id", "personId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check("Person");
PRAGMA foreign_key_check("Project");
PRAGMA foreign_keys=ON;
