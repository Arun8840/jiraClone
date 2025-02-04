"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MoreHorizontal } from "lucide-react"
import React from "react"
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
import { Loader } from "@/Utility/Ui/Loader"
import Avatar from "@/Utility/Ui/Avatar"
import { useGetParamId } from "@/hooks/use-getParamId"
import ErrorComponent from "@/Utility/Ui/Error-component"
import { useRouter } from "next/navigation"

function MembersList() {
  const { workspaceId } = useGetParamId()
  const router = useRouter()
  const { mutate: updateMember, isPending: isMemberupdating } =
    useUpdateMember()

  const [DeleteModal, confirmDelete] = useConfirm(
    "Remove member",
    "This member will be removed from the workspace",
    "destructive"
  )

  const { mutate: deleteMember } = useDeleteMember()

  const {
    data: members,
    isLoading,
    error,
  } = useGetMembers({
    workspaceId,
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

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorComponent />
  }
  return (
    <div className="container mx-auto">
      <DeleteModal />
      <div className="pt-2 flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <Button onClick={() => router.back()} size={"sm"} variant={"outline"}>
            <ArrowLeft />
            Back
          </Button>
          <h1 className="text-xl dark:text-white flex-1 font-medium font-poppins_normal">
            Members List
          </h1>
        </div>

        {/* members */}
        <Card className="shadow-none rounded-none">
          <Table>
            <TableCaption className="border-t p-2 border-dashed text-primary bg-primary/10">
              A list of your workspace members.
            </TableCaption>
            <TableHeader>
              <TableRow className="dark:border-dashed">
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
                const memberId = memberValues.$id as string
                return (
                  <TableRow key={memberValues.$id} className="dark:text-white">
                    <TableCell className="font-medium">
                      <Avatar className="size-12" title={memberValues?.name} />
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
      </div>
    </div>
  )
}

export default MembersList
