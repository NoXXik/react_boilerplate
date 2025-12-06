export type AccessActionCode = string;
export type AccessTabCode = string;
export type AccessModuleCode = string;

export type AccessAction = {
  code: AccessActionCode;
  name: string;
};

export type AccessTab = {
  code: AccessTabCode;
  name: string;
  actions: AccessAction[];
};

export type AccessModule = {
  code: AccessModuleCode;
  name: string;
  tabs: AccessTab[];
};

export type AccessMatrix = AccessModule[];

export type AccessRole = {
  id: string;
  code: string;
  name: string;
};

export type AccessMatrixAll = {
  modules: AccessModule[];
  actions: AccessAction[];
  roles: AccessRole[];
  matrices: Record<string, AccessModule[]>; // roleCode -> modules
};

export type AccessUpsertInput = {
  roleCode: string;
  moduleCode: string;
  tabCode: string;
  actionCodes: string[];
};

