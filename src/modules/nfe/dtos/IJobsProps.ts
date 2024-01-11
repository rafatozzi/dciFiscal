export interface IJobsProps {
  key: string;
  handle(data: any): Promise<any>;
  options?: any;
}