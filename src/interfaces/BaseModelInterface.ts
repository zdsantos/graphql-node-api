import { ModelsInterfaces } from "./ModelsInterfaces";

export interface BaseModelInterface {

  prototype?;
  associate?(models: ModelsInterfaces): void;

}