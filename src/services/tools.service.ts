// Tools Service
export class ToolsService {

    public trimObj(obj) {
        if (!Array.isArray(obj) && typeof obj != 'object') return obj;
        return Object.keys(obj).reduce(function(acc, key) {
          acc[key.trim()] = typeof obj[key] == 'string' ? obj[key].trim() : this.trimObj(obj[key]);
          return acc;
        }.bind(this), Array.isArray(obj)? []:{});
    }

}