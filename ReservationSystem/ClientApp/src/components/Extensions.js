Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    var yyyy = this.getFullYear();
    
    return `${yyyy}-${mm}-${dd}`;
  };