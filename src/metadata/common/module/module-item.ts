export abstract class ModuleItem {
  name: string = '';

  build(structure: any) {
    if (structure.p && structure.p.name) {
      this.name = structure.p.name; 
    }
  }
}
