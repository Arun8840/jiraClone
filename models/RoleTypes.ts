export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface WorkspaceResponse {
  documents: any[]
  total: number
}
