"use strict";

var Models = (function() {
    class Book {
        constructor(initArray) {
            // console.log('tt');
            // console.log(typeof(initArray));
            // console.log(typeof([initArray]));
            // console.log(typeof([1, '2']));
            console.log(initArray);
            for (var value of initArray) {
                console.log(value);
            }
            let [id, name, genre, author, isHasCD, isHasDVD, publishingHouse, type] = initArray;
            this.id = id;
            this.name = name;
            this.genre = genre;
            this.author = author;
            this.isHasCD = isHasCD;
            this.isHasDVD = isHasDVD;
            this.publishingHouse = publishingHouse;
            this.type = type;
        }
        get Id() {
            return this.id;
        };

        get Type() {
            return this.type;
        };
        // name get/set.
        get Name() {
            return this.name;
        };
        set Name(name) {
            if (typeof(name) == "string") {
                this.name = name;
            } else {
                throw "Variable isn't a string";
            }
        };
        // genre get/set.
        get Genre() {
            return this.genre;
        };
        set Genre(genre) {
            if (typeof(genre) == "string") {
                this.genre = genre;
            } else {
                throw "Variable isn't a string";
            }
        };
        // author get/set.
        get Author() {
            return this.author;
        };
        set Author(author) {
            if (typeof(author) == "string") {
                this.author = author;
            } else {
                throw "Variable isn't a string";
            }
        };
        // isHasCd get/set.
        get IsHasCD() {
            return this.isHasCD;
        };
        set IsHasCD(isHas) {
            if (typeof(isHas) == "boolean") {
                this.isHasCD = isHas;
            } else {
                if (isHas == 1) this.isHasCD = true;
                if (isHas == 0) this.isHasCD = false;
                throw "Variable isn't a boolean";
            }
        };
        // isHasDVD get/set.
        get IsHasDVD() {
            return this.isHasDVD;
        };
        set IsHasDVD(isHas) {
            if (typeof(isHas) == "boolean") {
                this.isHasDVD = isHas;
            } else {
                if (isHas == 1) this.isHasDVD = true;
                if (isHas == 0) this.isHasDVD = false;
                throw "Variable isn't a boolean";
            }
        };
        // publishingHouse get/set.
        get PublishingHouse() {
            return this.publishingHouse;
        }
        set PublishingHouse(publishingHouse) {
            if (typeof(publishingHouse) == "string") {
                this.publishingHouse = publishingHouse;
            } else {
                throw "Variable isn't a string";
            }
        };

        GetInfo() {
            return this.Name + ' ' +
                this.Genre + ' ' +
                this.Author + ' ' +
                this.IsHasCD + ' ' +
                this.IsHasDVD + ' ' +
                this.PublishingHouse;
        }
    }

    class AudioBook extends Book {
        constructor(initArray) {
            // console.log('ausio');
            // console.log(initArray);
            super(initArray);
            this.duration = initArray.Duration;
            this.size = initArray.Size;
        };

        // duration get/set
        get Duration() {
            return this.duration;
        };
        set Duration(duration) {
            if (typeof(duration) == "number") {
                this.duration = duration;
            } else {
                throw "Variable isn't a number";
            }
        };
        // size get/set
        get Size() {
            return this.size;
        };
        set Size(size) {
            if (typeof(size) == "number") {
                _size = size;
            } else {
                throw "Variable isn't a number";
            }
        };

        GetInfo() {
            return super.GetInfo() + ' ' + this.Duration() + ' ' + this.Size();
        }
    };

    class SchoolBook extends Book {
        constructor(initArray) {
            super(initArray);
            this.pageCount = initArray.PageCount;
            this.coverType = initArray.CoverType;
        };

        // pageCount get/set.
        get PageCount() {
            return this.pageCount;
        };
        set PageCount(pageCount) {
            if (typeof(pageCount) == "number") {
                this.pageCount = pageCount;
            } else {
                throw "Variable isn't a number";
            }
        };
        // coverType get/set.
        get CoverType() {
            return this.coverType;
        }
        set CoverType(coverType) {
            if (typeof(publishingHouse) == "string") {
                this.coverType = coverType;
            } else {
                throw "Variable isn't a string";
            }
        }
        GetInfo() {
            return super.GetInfo() + ' ' + this.PageCount() + ' ' + this.CoverType();
        }
    };
    return {
        CreateBook: function(book) {
            return new Book(book);
        },
        CreateAudioBook: function(book) {
            return new AudioBook(book);
        },
        CreateSchoolBook: function(book) {
            return new SchoolBook(book);
        },
        GetInfoByBook: function(book) {
            return book.GetInfo();
        }
    }
})();