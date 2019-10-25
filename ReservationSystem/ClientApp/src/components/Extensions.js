Date.prototype.ddmmyyyy = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    var yyyy = this.getFullYear();
    
    return `${dd}-${mm}-${yyyy}`;
  };