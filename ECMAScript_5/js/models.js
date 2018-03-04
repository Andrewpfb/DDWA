"use strict";

var Models = (function() {
    function Book(initArray) {

        // property.
        var _id = initArray.id,
            _name = initArray.Name,
            _genre = initArray.Genre,
            _author = initArray.Author,
            _isHasCD = initArray.IsHasCD,
            _isHasDVD = initArray.IsHasDVD,
            _publishingHouse = initArray.PublishingHouse,
            _type = initArray.Type;

        this.Type = function() {
                return _type;
            }
            // id get.
        this.Id = function() {
                return _id;
            }
            // name get/set.
        this.Name = function(name) {
            if (!arguments.length) return _name;

            if (typeof(name) == "string") {
                _name = name;
            } else {
                throw "Variable isn't a string";
            }
        };
        // genre get/set.
        this.Genre = function(genre) {
            if (!arguments.length) return _genre;

            if (typeof(genre) == "string") {
                _genre = genre;
            } else {
                throw "Variable isn't a string";
            }
        };
        // author get/set.
        this.Author = function(author) {
            if (!arguments.length) return _author;

            if (typeof(author) == "string") {
                _author = author;
            } else {
                throw "Variable isn't a string";
            }
        };
        // isHasCd get/set.
        this.IsHasCD = function(isHas) {
            if (!arguments.length) return _isHasCD;

            if (typeof(isHas) == "boolean") {
                _isHasCD = isHas;
            } else {
                if (isHas == 1) _isHasCD = true;
                if (isHas == 0) _isHasCD = false;
                throw "Variable isn't a boolean";
            }
        };
        // isHasDVD get/set.
        this.IsHasDVD = function(isHas) {
            if (!arguments.length) return _isHasDVD;

            if (typeof(isHas) == "boolean") {
                _isHasDVD = isHas;
            } else {
                if (isHas == 1) _isHasDVD = true;
                if (isHas == 0) _isHasDVD = false;
                throw "Variable isn't a boolean";
            }
        };
        // publishingHouse get/set.
        this.PublishingHouse = function(publishingHouse) {
            if (!arguments.length) return _publishingHouse;

            if (typeof(publishingHouse) == "string") {
                _publishingHouse = publishingHouse;
            } else {
                throw "Variable isn't a string";
            }
        };

    };
    Book.prototype.GetInfo = function() {
        return this.Name() + ' ' +
            this.Genre() + ' ' +
            this.Author() + ' ' +
            this.IsHasCD() + ' ' +
            this.IsHasDVD() + ' ' +
            this.PublishingHouse();
    }

    function AudioBook(initArray) {
        Book.apply(this, arguments);
        var _duration = initArray.Duration,
            _size = initArray.Size;

        // duration get/set
        this.Duration = function(duration) {
                if (!arguments.length) return _duration;

                if (typeof(duration) == "number") {
                    _duration = duration;
                } else {
                    throw "Variable isn't a number";
                }
            }
            // size get/set
        this.Size = function(size) {
            if (!arguments.length) return _size;

            if (typeof(size) == "number") {
                _size = size;
            } else {
                throw "Variable isn't a number";
            }
        }
    };
    AudioBook.prototype.GetInfo = function() {
        return Book.prototype.GetInfo.apply(this, arguments) + ' ' + this.Duration() + ' ' + this.Size();
    }

    function SchoolBook(initArray) {
        Book.apply(this, arguments);
        var _pageCount = initArray.PageCount,
            _coverType = initArray.CoverType;

        // pageCount get/set.
        this.PageCount = function(pageCount) {
                if (!arguments.length) return _pageCount;

                if (typeof(pageCount) == "number") {
                    _pageCount = pageCount;
                } else {
                    throw "Variable isn't a number";
                }
            }
            // coverType get/set.
        this.CoverType = function(coverType) {
            if (!arguments.length) return _coverType;

            if (typeof(publishingHouse) == "string") {
                _coverType = coverType;
            } else {
                throw "Variable isn't a string";
            }
        }
    };
    SchoolBook.prototype.GetInfo = function() {
        return Book.prototype.GetInfo.apply(this, arguments) + ' ' + this.PageCount() + ' ' + this.CoverType();
    }
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