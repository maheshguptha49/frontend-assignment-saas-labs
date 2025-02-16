"use client";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { ProjectResponseData } from "./types";

interface ProjectsTableProps {
  initialData: ProjectResponseData;
}

export default function ProjectsTable({ initialData }: ProjectsTableProps) {
  const [data, setData] = useState<ProjectResponseData>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentPage > 1) {
      fetchClientData(currentPage, limit);
    }
  }, [currentPage, limit]);

  async function fetchClientData(page: number, limit: number) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects?page=${page}&limit=${limit}`);
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < data.totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <div className={styles.header}>
          <div className={styles.headerCell}>Title</div>
          <div className={styles.headerCell}>Creator</div>
          <div className={styles.headerCell}>Location</div>
          <div className={styles.headerCell}>Pledged</div>
          <div className={styles.headerCell}>Funded</div>
          <div className={styles.headerCell}>Backers</div>
          <div className={styles.headerCell}>Type</div>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.body}>
            {data.data.map((project) => (
              <div key={project["s.no"]} className={styles.row}>
                <div className={styles.cell}>{project.title}</div>
                <div className={styles.cell}>{project.by}</div>
                <div className={styles.cell}>{project.location}</div>
                <div className={styles.cell}>
                  ${project["amt.pledged"].toLocaleString()}
                </div>
                <div className={styles.cell}>
                  {project["percentage.funded"]}%
                </div>
                <div className={styles.cell}>{project["num.backers"]}</div>
                <div className={styles.cell}>{project.type}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setCurrentPage(1);
          }}
          className={styles.select}
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>

        <div className={styles.pageControls}>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1 || isLoading}
            className={styles.pageButton}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {data.totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === data.totalPages || isLoading}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
