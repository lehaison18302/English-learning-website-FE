import { axiosClient } from "./baseApi";
import apiEndpoints from "./endPoint";

const apiCommon = {
  getPronounce: () => {  
      const url = `pronounce`;
      return axiosClient.get(url);
    },
  getUseData: (id) => {
    const url = `user/${id}`;
    return axiosClient.get(url);
  },
  // Lesson APIs
  getAllLessons: () => {
    return axiosClient.get(apiEndpoints.getAllLessons);
  },
  getLessonContent: (lessonId) => {
    return axiosClient.get(apiEndpoints.getLessonContent(lessonId));
  },
  submitExerciseAnswer: (lessonId, exerciseId, answer) => {
    return axiosClient.post(apiEndpoints.submitExerciseAnswer(lessonId, exerciseId), { answer });
  },
  getLessonProgress: (lessonId) => {
    return axiosClient.get(apiEndpoints.getLessonProgress(lessonId));
  },
  getVocabularyAudio: (word) => {
    return axiosClient.get(apiEndpoints.getVocabularyAudio(word));
  }
};

export default apiCommon;