Array.prototype.pushIfUnique = function(entryIn){
    var arr = this;
    var unique = true;
    arr.forEach(function(entry){
        if(entryIn === entry){
            unique = false;
        }
    });
    if(unique){
        arr.push(entryIn);
    }
};

