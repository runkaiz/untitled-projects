class ModuleManager {
    constructor() {
        this._modules = [];
    }
  
    add(mod) {
        this._modules.push(mod);
    }

    remove(mod) {
        const search_value = mod;
        const search_index = this._modules.indexOf(search_value);
        if(search_index >= 0) {
            this._modules.splice(search_index, 1);
        }
    }

    report() {
        return "Reporting: " + JSON.stringify(this._modules);
    }
}
  
const instance = new ModuleManager();
Object.freeze(instance);
  
export default instance;
