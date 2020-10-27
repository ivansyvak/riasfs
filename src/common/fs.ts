export interface FSItem {
  name: string;
  parent: FSItem | null;

  getPath: () => string;

  generateFiles: () => void;
}

export interface FSDirectory extends FSItem {
  children: FSItem[];  
}
