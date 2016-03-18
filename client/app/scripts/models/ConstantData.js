export default class ConstantData {
    constructor(ConstantData){
        this.ConstantData = ConstantData;
    }
    get originData(){
        return this.ConstantData;
    }
    get data(){
        return {
            ConstantData:this.ConstantData
        }
    }
}