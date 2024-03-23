export interface IInfo {
  page: number;
  count: number;
  links: {
    next_url: string, 
    prev_url: string, 
  },
  total_pages: number;
  total_users: number;
}
