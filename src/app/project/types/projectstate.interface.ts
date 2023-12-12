import {ProjectInterface} from "../../home/projects/types/project.interface";

export interface ProjectStateInterface {
  isLoading: boolean
  error: string | null
  data: ProjectInterface | null
}
