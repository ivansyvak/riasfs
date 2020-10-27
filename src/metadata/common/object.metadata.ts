import { Metadata } from "./metadata";
import { MetadataModule } from "./module/metadata-module";

export abstract class ObjectMetadata extends Metadata {  
  module: MetadataModule | null;

  constructor() {
    super();
    
    this.module = new MetadataModule();
  }

  build(structure: any) {
    super.build(structure);

    // data build

    // module build
    this.module?.build(structure.module);
  }

  getPath() {
    let path = '';
    if (this.parent !== null) {
      path = this.parent.getPath();
    }

    path += `/${this.shortName}`;

    return path;
  }
}
