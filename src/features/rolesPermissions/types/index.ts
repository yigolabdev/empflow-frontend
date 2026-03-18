export interface Permission {
  id: string;
  name: string;
  category: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  type: 'system' | 'custom';
  isBuiltIn: boolean;
  permissions: Permission[];
  memberCount: number;
  lastModified: Date;
  modifiedBy: string;
}

export interface PermissionConflict {
  id: string;
  type: 'permission_override' | 'permission_redundancy' | 'insufficient_permissions';
  severity: 'error' | 'warning' | 'info';
  description: string;
  affectedRoles: string[];
  suggestion: string;
  detectedDate: Date;
}

export interface PermissionHistory {
  id: string;
  timestamp: Date;
  roleId: string;
  roleName: string;
  action: 'created' | 'modified' | 'deleted';
  changedFields: {
    fieldName: string;
    oldValue: string;
    newValue: string;
  }[];
  changedBy: string;
  reason?: string;
}