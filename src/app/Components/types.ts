export interface Project {
  "s.no": number;
  "amt.pledged": number;
  blurb: string;
  by: string;
  country: string;
  currency: string;
  "end.time": string;
  location: string;
  "percentage.funded": number;
  "num.backers": string;
  state: string;
  title: string;
  type: string;
  url: string;
}

export interface ProjectResponseData {
  data: Project[];
  total: number;
  totalPages: number;
  currentPage: number;
}
