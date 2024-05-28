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
    CONSTRAINT "Person_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("created_at", "facebookUrl", "githubName", "githubUrl", "id", "instagramUrl", "linkedinUrl", "name", "subTitle", "teamId", "text", "updated_at") SELECT "created_at", "facebookUrl", "githubName", "githubUrl", "id", "instagramUrl", "linkedinUrl", "name", "subTitle", "teamId", "text", "updated_at" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectUrl" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "Project_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("id", "personId", "projectUrl") SELECT "id", "personId", "projectUrl" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check("Person");
PRAGMA foreign_key_check("Project");
PRAGMA foreign_keys=ON;
