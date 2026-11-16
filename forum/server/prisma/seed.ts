/**
 * Seed roles, permissions, and category tree.
 * Run after `npx prisma migrate dev`: `npm run db:seed`
 *
 * Requires generated Prisma client — install deps in this package first.
 */

import { CATEGORY_SEED } from "../src/data/categorySeed.js";
import { PERMISSIONS, ROLE_DEFAULTS } from "../src/rbac/permissions.js";

async function main() {
  // Dynamic import so `tsc` of src/ does not require generated client at scaffold time.
  const { PrismaClient, GlobalRole } = await import("@prisma/client");
  const prisma = new PrismaClient();

  for (const key of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { key },
      create: { key, label: key },
      update: {},
    });
  }

  for (const [roleKey, perms] of Object.entries(ROLE_DEFAULTS)) {
    const role = await prisma.role.upsert({
      where: { key: roleKey as keyof typeof GlobalRole },
      create: {
        key: roleKey as keyof typeof GlobalRole,
        label: roleKey,
      },
      update: {},
    });
    for (const permKey of perms) {
      const permission = await prisma.permission.findUniqueOrThrow({
        where: { key: permKey },
      });
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: { roleId: role.id, permissionId: permission.id },
        },
        create: { roleId: role.id, permissionId: permission.id },
        update: {},
      });
    }
  }

  for (const [i, cat] of CATEGORY_SEED.entries()) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      create: { slug: cat.slug, icon: cat.icon, sortOrder: i },
      update: { icon: cat.icon, sortOrder: i },
    });
    for (const [j, sectionSlug] of cat.sections.entries()) {
      await prisma.section.upsert({
        where: {
          categoryId_slug: { categoryId: category.id, slug: sectionSlug },
        },
        create: {
          categoryId: category.id,
          slug: sectionSlug,
          sortOrder: j,
          isPublic: true,
        },
        update: { sortOrder: j },
      });
    }
  }

  console.log("Seed complete: roles, permissions, categories.");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
