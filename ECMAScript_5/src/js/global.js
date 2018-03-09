const GLOBAL_CONST = (function() {
    const url = 'http://localhost:2403/books';
    const audioType = 1;
    const schoolType = 2;
    return {
        URL: url,
        AUDIO_TYPE: audioType,
        SCHOOL_TYPE: schoolType
    }
})();

export default GLOBAL_CONST;