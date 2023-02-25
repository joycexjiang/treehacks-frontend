export interface Meeting {
    id: string;
    date: string;
    title: string;
    // participants: string[];
    transcripts: Transcript[];
    questions: string[];
    aboutUser: string;
    learningObjectives: string;
    downloadUrl: string;
  }
  
export interface Transcript {
  id: string;
  role: string;
  text: string;
}

export interface Chunk {
  id: string;
  text: string;
  interviewee_name: string;
  file_name: string;
  chunk_start: string;
  chunk_end: string;
}
  