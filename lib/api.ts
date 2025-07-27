export const api = {
  auth: {
    login: "api/admin/auth",
    session: "api/admin/session",
    logout: "api/admin/logout",
  },
  company: {
    requests: "api/admin/list_company_requests",
    list: "api/admin/list_companies",
    add: "api/admin/add_company",
  },
  users: {
    list: "api/admin/list_users",
  },
  projects: "api/admin/list_projects",
} as const;
