import { strict } from "assert";
import { ModuleFuncGroup } from "./module-func-group";

export class MetadataModule extends ModuleFuncGroup {
  name = 'module';

  includes: number[] = [];

  build(structure: any) {
    super.build(structure);

    if (structure.c && structure.c.includes) {
      this.includes = structure.c.includes;
    }
    
  }
}
