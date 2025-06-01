const BASE_URL = "http://localhost:3000";

const apiEndpoints = {
    // Lesson endpoints
    getAllLessons: `${BASE_URL}/api/exercises/lessons`,
    getLessonContent: (lessonId) => `${BASE_URL}/api/exercises/lesson/${lessonId}`,
    submitExerciseAnswer: (lessonId, exerciseId) => `${BASE_URL}/lessons/${lessonId}/exercises/${exerciseId}/submit`,
    getLessonProgress: (lessonId) => `${BASE_URL}/lessons/${lessonId}/progress`,
    getVocabularyAudio: (word) => `${BASE_URL}/audio/${word}`,
    // Firebase endpoints
    getUserProfile: 'users', // Firestore collection name
    updateUserProfile: 'users', // Firestore collection name
    getUserCompletedLessons: 'completedLessons', // Firestore collection name
    getUserStatistics: 'userStatistics' // Firestore collection name
}

export default apiEndpoints;