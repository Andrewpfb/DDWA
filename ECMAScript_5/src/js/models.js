const Models = (function() {
    class Book {
        constructor(initArray) {
            let { id, Name, Genre, Author, IsHasCD, IsHasDVD, PublishingHouse, Type } = initArray;
            this.id = id;
            this.name = Name;
            this.genre = Genre;
            this.author = Author;
            this.isHasCD = IsHasCD;
            this.isHasDVD = IsHasDVD;
            this.publishingHouse = PublishingHouse;
            this.type = Type;
        }

        [Symbol.iterator]() {
            let _this = this;
            let keys = null;
            let index = 0;

            return {
                next: function() {
                    if (keys === null) {
                        keys = Object.keys(_this).sort();
                    }

                    return {
                        value: keys[index],
                        done: index++ >= keys.length
                    };
                }
            }
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
                throw `Variable isn't a string`;
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
                throw `Variable isn't a string`;
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
                throw `Variable isn't a string`;
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
                throw `Variable isn't a boolean`;
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
                throw `Variable isn't a boolean`;
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
                throw `Variable isn't a string`;
            }
        };

        GetInfo() {
            return `
            Name: ${this.Name} 
            Genre: ${this.Genre}
            Author: ${this.Author} 
            CD: ${this.IsHasCD} 
            DVD: ${this.IsHasDVD} 
            Publishing house: ${this.PublishingHouse}`;
        }
    }

    class AudioBook extends Book {
        constructor(initArray) {
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
                throw `Variable isn't a number`;
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
                throw `Variable isn't a number`;
            }
        };

        GetInfo() {
            return `
            ${super.GetInfo()} 
            Duration: ${this.Duration} 
            Size: ${this.Size}`;
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
                throw `Variable isn't a number`;
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
                throw `Variable isn't a string`;
            }
        }
        GetInfo() {
            return `
            ${super.GetInfo()}
            Page count: ${this.PageCount} 
            Cover type: ${this.CoverType}`;
        }
    };
    return {
        CreateAudioBook: function(book) {
            return new AudioBook(book);
        },
        CreateSchoolBook: function(book) {
            return new SchoolBook(book);
        },
        GetInfoByBook: function(book) {
            return book.GetInfo();
        },
        ProxyExample: function(book) {
            return new Proxy(book, {
                get(target, prop) {
                    console.log(`Read ${prop}`);
                    return target[prop];
                }
            })
        }
    }
})();

export default Models;