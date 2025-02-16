import styles from "./page.module.css";
import ProjectsTable from "@/app/Components/ProjectsTable";
import { getPaginatedData } from "@/app/api/projects/route";
export const revalidate = 3; // fetches api every 3 seconds and builds the html page and stores it in server - ready to serve to the user:)

const getInitialProjects = () => {
  const response = getPaginatedData(1, 10);
  return response;
};
export default async function Home() {
  const initialData = await getInitialProjects();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects</h1>
      <ProjectsTable initialData={initialData} />
    </div>
  );
}
