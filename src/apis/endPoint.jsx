const BASE_URL = "http://localhost:3000";

const apiEndpoints = {
    getUserByID: `${BASE_URL}/user`,
    // Lesson endpoints
    getAllLessons: `${BASE_URL}/lessons`,
    getLessonContent: (lessonId) => `${BASE_URL}/lessons/${lessonId}/content`,
    submitExerciseAnswer: (lessonId, exerciseId) => `${BASE_URL}/lessons/${lessonId}/exercises/${exerciseId}/submit`,
    getLessonProgress: (lessonId) => `${BASE_URL}/lessons/${lessonId}/progress`,
    getVocabularyAudio: (word) => `${BASE_URL}/audio/${word}`
}

export default apiEndpoints;