"use server"

import { redirect } from "next/navigation"

import { requireAdmin } from "@/lib/auth/require-admin"
import {
  createElectiveCluster,
  deleteElectiveCluster,
  updateElectiveCluster,
} from "@/lib/db/admin"
import { revalidateContent } from "@/lib/db/revalidate"
import type { ElectiveCluster } from "@/lib/db/models/elective-cluster"
import {
  readList,
  readOrder,
  readString,
  readValues,
  toErrorState,
} from "../action-utils"
import type { AcademicsListFormState } from "../list-form-state"

const FIELDS = ["name", "summary", "pathways", "tone", "order"]

function toCluster(
  values: Record<string, string>,
  formData: FormData
): ElectiveCluster {
  return {
    name: values.name,
    summary: values.summary,
    subjects: readList(formData, "subjects"),
    pathways: values.pathways,
    tone: values.tone as ElectiveCluster["tone"],
    order: readOrder(formData),
  }
}

export async function createElectiveClusterAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const scalarValues = readValues(formData, FIELDS)
  const values = {
    ...scalarValues,
    subjects: readList(formData, "subjects"),
  }
  try {
    await createElectiveCluster(toCluster(scalarValues, formData))
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/elective-clusters")
}

export async function updateElectiveClusterAction(
  _previous: AcademicsListFormState,
  formData: FormData
): Promise<AcademicsListFormState> {
  await requireAdmin()

  const scalarValues = readValues(formData, FIELDS)
  const values = {
    ...scalarValues,
    subjects: readList(formData, "subjects"),
  }
  try {
    const updated = await updateElectiveCluster(
      readString(formData, "id"),
      toCluster(scalarValues, formData)
    )
    if (!updated) {
      return { status: "error", message: "That elective cluster no longer exists." }
    }
  } catch (error) {
    return { ...toErrorState(error), values }
  }

  revalidateContent("academics")
  redirect("/admin/academics/elective-clusters")
}

export async function deleteElectiveClusterAction(formData: FormData) {
  await requireAdmin()

  await deleteElectiveCluster(readString(formData, "id"))
  revalidateContent("academics")
  redirect("/admin/academics/elective-clusters")
}
