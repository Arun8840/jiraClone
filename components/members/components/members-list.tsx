"use client"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetWorkspaces } from "@/components/workspaces/api/use-get-workspaces"
import { ArrowLeft, Loader, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useGetMembers } from "../api/use-get-members"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUpdateMember } from "../api/use-update-member"
import { useDeleteMember } from "../api/use-delete-member"
import { useConfirm } from "@/hooks/use-confirm"
import { toast } from "@/hooks/use-toast"
import { MemberRole } from "@/models/RoleTypes"

function MembersList() {
  const router = useRouter()
  const { data: workspacesData, isPending: isWorkspacePending } =
    useGetWorkspaces()
  const workspaces = workspacesData?.documents
  const initialId = (workspaces && workspaces[0].$id) || ""
  const [selectedId, setSelectedId] = useState<string | null>(
    (workspaces && workspaces[0].$id) ?? null
  )

  const [DeleteModal, confirmDelete] = useConfirm(
    "Remove member",
    "This member will be removed from the workspace",
    "destructive"
  )

  const { mutate: updateMember, isPending: isMemberupdating } =
    useUpdateMember()
  const { mutate: deleteMember } = useDeleteMember()

  const { data: members, isPending: isMemberPending } = useGetMembers({
    workspaceId: selectedId || initialId,
  })
  const tableHeaders: string[] = [
    "Profile",
    "Name",
    "Email",
    "Created At",
    "Action",
  ]

  const handleDeleteMember = async (memberId: string) => {
    const confirm = await confirmDelete()
    if (!confirm) return

    deleteMember(
      {
        param: { memberId },
      },
      {
        onSuccess: ({ message }) => {
          toast({
            title: "Member delete",
            description: message,
            variant: "success",
          })
        },
        onError: ({ message }) => {
          toast({
            title: "Member delete",
            description: message,
            variant: "destructive",
          })
        },
      }
    )
  }

  const handleSelectWorkspace = (id: string) => {
    setSelectedId(id)
  }
  return (
    <div className="container mx-auto">
      <DeleteModal />
      <div className="pt-2 flex flex-col gap-3">
        <div className="grid grid-cols-2">
          <h1 className="text-xl self-center flex-1 font-medium font-poppins_normal">
            Members List
          </h1>
          <div className="w-full">
            <h1 className="pb-2 text-sm">Select Workspaces</h1>
            {isWorkspacePending ? (
              <div className="flex justify-center">
                <Loader className="animate-spin origin-center" />
              </div>
            ) : (
              <Select
                defaultValue={initialId}
                onValueChange={handleSelectWorkspace}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Workspaces" />
                </SelectTrigger>
                <SelectContent>
                  {workspaces?.map((workspaceItems) => {
                    return (
                      <SelectItem
                        key={workspaceItems?.$id}
                        value={workspaceItems?.$id}
                      >
                        {workspaceItems?.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* members */}
        {isMemberPending ? (
          <div className="flex justify-center p-3">
            <Loader className="animate-spin origin-center" />
          </div>
        ) : (
          <Card>
            <Table>
              <TableCaption className="border-t p-2 border-dashed bg-lime-50 text-lime-600">
                A list of your workspace members.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  {tableHeaders?.map((headers) => {
                    return (
                      <TableHead
                        key={headers}
                        className={`${
                          headers.includes("Action") && "text-center"
                        }`}
                      >
                        {headers}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {members?.document?.map((memberValues) => {
                  const firstLetter =
                    memberValues?.name.charAt(0).toUpperCase() ?? "M"
                  const memberId = memberValues.$id as string
                  return (
                    <TableRow key={memberValues.$id}>
                      <TableCell className="font-medium">
                        <div className="size-14 grid place-items-center bg-neutral-50 rounded-full">
                          {firstLetter}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <p className="line-clamp-1">{memberValues?.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="line-clamp-1">{memberValues.email}</p>
                      </TableCell>
                      <TableCell>
                        <p className="line-clamp-1">
                          {memberValues.$createdAt?.split("T")[0]}
                        </p>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant={"outline"}
                                className="size-fit p-2"
                              >
                                <MoreHorizontal
                                  size={18}
                                  className="text-neutral-500"
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                disabled={isMemberupdating}
                                onClick={() =>
                                  updateMember({
                                    json: { role: MemberRole.ADMIN },
                                    param: {
                                      memberId: memberId,
                                    },
                                  })
                                }
                              >
                                Set as administrator
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  updateMember({
                                    json: { role: MemberRole.MEMBER },
                                    param: {
                                      memberId: memberId,
                                    },
                                  })
                                }
                              >
                                Set as member
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteMember(memberValues?.$id)
                                }
                                className="text-red-600"
                              >
                                Remove {memberValues?.name}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  )
}

export default MembersList
