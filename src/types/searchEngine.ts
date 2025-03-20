export interface SearchEngine {
  id: string;
  name: string;
  icon: string;
  searchUrl: string;
}

export interface SearchEngineState {
  selectedEngine: SearchEngine;
  engines: SearchEngine[];
}