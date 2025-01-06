import IProject from "./IProject";

export default interface ITask {
  timeInSeconds: number,
  task: string,
  project: IProject,
}