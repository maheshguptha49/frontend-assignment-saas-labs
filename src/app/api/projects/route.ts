import { NextResponse } from "next/server";
import projectsData from "@/app/frontend-assignment.json";
import { Project, ProjectResponseData } from "@/app/Components/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    return NextResponse.json<ProjectResponseData>(
      getPaginatedData(page, limit)
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
export const getPaginatedData = (page: number, limit: number) => {
  console.log("in getPaginatedData");
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = projectsData.slice(startIndex, endIndex) as Project[];
  return {
    data: paginatedData,
    total: projectsData.length,
    totalPages: Math.ceil(projectsData.length / limit),
    currentPage: page,
  };
};
