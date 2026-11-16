import { ROLE_DEFAULTS, type PermissionKey } from "./permissions.js";

export type AuthContext = {
  userId: string | null;
  /** Global roles on the user. */
  roles: (keyof typeof ROLE_DEFAULTS)[];
  /** Optional section-scoped role keys for the current section. */
  sectionRoles?: (keyof typeof ROLE_DEFAULTS)[];
};

export function collectPermissions(ctx: AuthContext): Set<PermissionKey> {
  const out = new Set<PermissionKey>();
  const roles = [...ctx.roles, ...(ctx.sectionRoles ?? [])];
  if (roles.length === 0) {
    for (const p of ROLE_DEFAULTS.GUEST) out.add(p);
    return out;
  }
  for (const role of roles) {
    for (const p of ROLE_DEFAULTS[role] ?? []) out.add(p);
  }
  return out;
}

/** Server-side gate — never trust client claims alone. */
export function can(ctx: AuthContext, permission: PermissionKey): boolean {
  return collectPermissions(ctx).has(permission);
}

export function assertCan(ctx: AuthContext, permission: PermissionKey): void {
  if (!can(ctx, permission)) {
    const err = new Error(`Forbidden: missing ${permission}`);
    (err as Error & { status: number }).status = 403;
    throw err;
  }
}
